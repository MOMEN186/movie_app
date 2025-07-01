// src/api/Movies.js (أو اسم الملف اللي عندك)

import axios from "axios";
import { API_CONFIG, API_KEY } from "./config"; // تأكدي إن المسار ده صح عندكِ
import { languageMap } from "./config"; // تأكدي إن المسار ده صح عندكِ

function getEndpoint(category) {
  if (category === "movie")
    return "https://api.themoviedb.org/3/discover/movie";
  else return "https://api.themoviedb.org/3/discover/tv";
}

function getDetailsEndPoint(category) {
   if (category=== "movie") {
      return  `https://api.themoviedb.org/3/movie/`;
    } else{
    return  `https://api.themoviedb.org/3/tv/`;
    }
}
function getConfig(language) {
       return  {
       params: {
         api_key: API_KEY,
         language: language,
       },
       headers: {
         "Content-Type": "application/json",
       },
     };
}

export async function getMovies(category, language, page) {
  console.log(`[getMovies] Called with category: ${category}, page: ${page}`); 
  const tmdbLanguage = languageMap[language] || "en-US";

  const axiosConfig = {
    params: {
      ...API_CONFIG,
      page: page,
      language: tmdbLanguage,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  const endpoint = getEndpoint(category);

  try {
    const res = await axios.get(endpoint, axiosConfig);
    const { results, total_pages, total_results } = res.data;
    let moviesAndShows = results;

    const blacklistedIds = [
      1069193, 1156646,1226792,1249220,1176647,1141064,1315127,967190,1157724,273854,1374332,1301779,1000626,1340466,943429,
      1300797,1075823,1405155,1191881,1318102,1000825,738955,1108467,1413254,1123301,846157,1152509,1231934,1232281,
      1047584,1274823,1315665,1307485,962196,836128,866326,1141867,898133,1238279,1481478,1108411,1214352,1124799,1224894,1047729,
      807206,860070,887731,1220386,882963,1480458,881147,1204092,810226,882972,882298,821391,1310623,1465200,1053708,951870,951506,
      1232704,1434885,827837,764699,760948,1369163,1414760,943730,809484,1220421,999990,1165714,1428422,1399629,1385642,1211301,
      1266518,1492000,1489241,1064771,947605,871444,1017538,1107165,912758,1385458,1060613,672046,1465196,1300307,1450168,1374371,
      1385461,1396397,1277384,1042999,1269731,1267478,1181202,1174418,1140788,1130592,1046342,950989,945235,938579,898353,819544,
      816374,738965,1443685,795763,1426195,1380107,1329698,1330463,1327866,1297292,1200993,1231777,1277380,1223289,1060921,1080136,
      1000161,955807,951524,976911,901386,884828,843592,1463015,683312,1501337,1408733,1385459,1385453,1360277,1269733,1231669,1269728,
      1241491,1230853,1222382,1239202,1222101,1108493,1048400,1013773,995448,878573,951518,884599,736831,201143,112083,126529,110506,
      125918,227176,110615,128654,54708,40323,246281,57806,228582,195484,206231,227297,1337730,289572
    ];

    const filteredContent = moviesAndShows.filter(item => {
      if (blacklistedIds.includes(item.id)) {
        return false;
      }
      if (item.adult === true) {
          return false;
      }
      return true;
    });
    
    console.log(`[getMovies] Returning ${filteredContent.length} items for category: ${category}`); 
    return { data: { results: filteredContent , total_pages: total_pages} };
  } catch (error) {
    console.error("[getMovies] API Error:", error); 
    throw error;
  }
}

export async function getMovieDetails({ id, category, query, language }) {
  const tmdbLanguage = languageMap[language] || "en-US";
  let endpoint = getDetailsEndPoint(category) + id;

  const MIN_RECOMMENDATIONS_COUNT = 9;

  // قوائم الأنواع للأفلام
  const desiredMovieRecommendationGenres = [16, 99, 10751]; // Animation, Documentary, Family
  const excludedMovieRecommendationGenres = [18, 28, 35, 80, 9648, 10749, 53, 878, 12, 14, 27, 36, 37, 10752];

  // IDs محظورة إضافية
  const commonBlacklistedIds = [611359, 198556, 14275];

  if (query === "recommendations") {
    let finalRecommendations = [];
    const seenIds = new Set([id]); 

    // ======== حالة المسلسلات (TV) ========
    if (category === "tvshow") { // تأكدي إن دي "tv" مش "tvshow"
      const currentIdNum = parseInt(id)
      console.log(`[getMovieDetails] TV category detected. Fetching recommendations for TV show ID: ${id}`);
      let recommendationsEndpoint = `https://api.themoviedb.org/3/tv/${id}/recommendations`; // **التعديل الرئيسي هنا**
      try {
        const recommendationsRes = await axios.get(
          recommendationsEndpoint,
          getConfig(tmdbLanguage)
        );
        let currentRecommendations = recommendationsRes.data.results || [];

        const filteredNativeRecommendations = (currentRecommendations).filter(item => {
            const hasDesired = item.genre_ids?.some(g => desiredMovieRecommendationGenres.includes(g));
            const hasExcluded = item.genre_ids?.some(g => excludedMovieRecommendationGenres.includes(g));

            return (
                !seenIds.has(item.id) &&
                !commonBlacklistedIds.includes(item.id) &&
                item.id !== currentIdNum &&
                !item.adult &&
                hasDesired &&
                !hasExcluded
            );
        });

        finalRecommendations = [...filteredNativeRecommendations];
        finalRecommendations.forEach(item => seenIds.add(item.id));

        if (finalRecommendations.length < MIN_RECOMMENDATIONS_COUNT) {
          console.log("[getMovieDetails - TV] Topping up TV recommendations with additional TV content.");
          let page = 1;
          let availableTvToTopUp = [];

          while (page <= 7 && finalRecommendations.length + availableTvToTopUp.length < MIN_RECOMMENDATIONS_COUNT) {
            console.log(`[getMovieDetails - TV] Calling getMovies for page: ${page} to top up.`);
            const randomPage = Math.floor(Math.random() * 7) + 1;
            const additionalTvContentRes = await getMovies("tv", language, randomPage);
            const rawAdditionalTv = additionalTvContentRes.data.results || [];

            rawAdditionalTv.forEach(item => {
                const hasDesired = item.genre_ids?.some(g => desiredMovieRecommendationGenres.includes(g));
                const hasExcluded = item.genre_ids?.some(g => excludedMovieRecommendationGenres.includes(g));

                if (
                    !seenIds.has(item.id) &&
                    !commonBlacklistedIds.includes(item.id) &&
                    item.id !== currentIdNum &&
                    !item.adult &&
                    hasDesired &&
                    !hasExcluded
                ) {
                    availableTvToTopUp.push(item);
                    seenIds.add(item.id);
                }
            });
            page++;
          }

          for (let i = 0; i < availableTvToTopUp.length && finalRecommendations.length < MIN_RECOMMENDATIONS_COUNT; i++) {
              finalRecommendations.push(availableTvToTopUp[i]);
          }
        }
        console.log(`[getMovieDetails - TV] Final TV recommendations count: ${finalRecommendations.length}`);
        finalRecommendations.forEach(rec => {
            console.log(`TV Rec ID: ${rec.id}, Name: ${rec.name || rec.title}, Genres: ${rec.genre_ids}`);
        });

        return { data: { results: finalRecommendations } };

      } catch (e) {
        console.error("[getMovieDetails - TV] Error fetching TV recommendations:", e);
        console.log("[getMovieDetails - TV] Falling back to additional TV content for recommendations due to error.");
        // الكود هنا مشابه للجزء اللي تحت للأفلام في حالة الفشل
        finalRecommendations = [];
        try {
            let page = 1;
            let availableFallbackTv = [];
            while (page <= 5 && finalRecommendations.length + availableFallbackTv.length < MIN_RECOMMENDATIONS_COUNT) {
                const fallbackTvContentRes = await getMovies("tv", language, randomPage);
                const rawFallbackTv = fallbackTvContentRes.data.results || [];

                rawFallbackTv.forEach(item => {
                    const hasDesired = item.genre_ids?.some(g => desiredMovieRecommendationGenres.includes(g));
                    const hasExcluded = item.genre_ids?.some(g => excludedMovieRecommendationGenres.includes(g));

                    if (
                        !seenIds.has(item.id) &&
                        !commonBlacklistedIds.includes(item.id) &&
                        !item.adult &&
                        hasDesired &&
                        !hasExcluded
                    ) {
                        availableFallbackTv.push(item);
                        seenIds.add(item.id);
                    }
                });
                page++;
            }
            for (let i = 0; i < availableFallbackTv.length && finalRecommendations.length < MIN_RECOMMENDATIONS_COUNT; i++) {
                finalRecommendations.push(availableFallbackTv[i]);
            }

        } catch (innerError) {
            console.error("[getMovieDetails - TV] Error fetching fallback TV content:", innerError);
        }
        console.log(`[getMovieDetails - TV] Fallback TV recommendations count: ${finalRecommendations.length}`);
        return { data: { results: finalRecommendations } };
      }
    }



    // ======== حالة الأفلام (Movies) ========
    if (category === "movie") {
      const currentIdNum = parseInt(id);
      console.log(`[getMovieDetails] Movie category detected. Fetching recommendations for movie ID: ${id}`); 
      let recommendationsEndpoint = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
      try {
        const recommendationsRes = await axios.get(
          recommendationsEndpoint,
          getConfig(tmdbLanguage)
        );
        let currentRecommendations = recommendationsRes.data.results || [];
        console.log(`itrr ${currentRecommendations}`)
        const filteredNativeRecommendations = (currentRecommendations).filter(item => {
            const hasDesired = item.genre_ids?.some(g => desiredMovieRecommendationGenres.includes(g));
            const hasExcluded = item.genre_ids?.some(g => excludedMovieRecommendationGenres.includes(g));
            
            return (
                !seenIds.has(item.id) &&
                !commonBlacklistedIds.includes(item.id) &&
                item.id !== id &&
                !item.adult &&
                hasDesired && 
                !hasExcluded
            );
        });

        finalRecommendations = [...filteredNativeRecommendations];
        finalRecommendations.forEach(item => seenIds.add(item.id));

        if (finalRecommendations.length < MIN_RECOMMENDATIONS_COUNT) {
          console.log("[getMovieDetails - Movie] Topping up movie recommendations with additional movie content.");
          let page = 1;
          let availableMoviesToTopUp = [];
          const randomPage = Math.floor(Math.random() * 25) + 1;

          while (page <= 5 && finalRecommendations.length + availableMoviesToTopUp.length < MIN_RECOMMENDATIONS_COUNT) {
            console.log(`[getMovieDetails - Movie] Calling getMovies for page: ${page} to top up.`); 
            const additionalMovieContentRes = await getMovies("movie", language, randomPage); 
            const rawAdditionalMovies = additionalMovieContentRes.data.results || [];
            
            rawAdditionalMovies.forEach(item => {
                const hasDesired = item.genre_ids?.some(g => desiredMovieRecommendationGenres.includes(g));
                const hasExcluded = item.genre_ids?.some(g => excludedMovieRecommendationGenres.includes(g));

                if (
                    !seenIds.has(item.id) &&
                    !commonBlacklistedIds.includes(item.id) &&
                    item.id !== currentIdNum &&
                    !item.adult &&
                    hasDesired && 
                    !hasExcluded
                ) {
                    availableMoviesToTopUp.push(item);
                    seenIds.add(item.id);
                }
            });
            page++;
          }
          
          for (let i = 0; i < availableMoviesToTopUp.length && finalRecommendations.length < MIN_RECOMMENDATIONS_COUNT; i++) {
              finalRecommendations.push(availableMoviesToTopUp[i]);
          }
        }
        console.log(`[getMovieDetails - Movie] Final Movie recommendations count: ${finalRecommendations.length}`);
        finalRecommendations.forEach(rec => {
            console.log(`Movie Rec ID: ${rec.id}, Title: ${rec.name || rec.title}, Genres: ${rec.genre_ids}`);
        });

        return { data: { results: finalRecommendations } };

      } catch (e) {
        console.error("[getMovieDetails - Movie] Error fetching movie recommendations:", e);
        console.log("[getMovieDetails - Movie] Falling back to additional movie content for recommendations due to error.");
        finalRecommendations = [];
        try {
            let page = 1;
            let availableFallbackMovies = [];
            while (page <= 5 && finalRecommendations.length + availableFallbackMovies.length < MIN_RECOMMENDATIONS_COUNT) {
                const fallbackMovieContentRes = await getMovies("movie", language, page);
                const rawFallbackMovies = fallbackMovieContentRes.data.results || [];
                
                rawFallbackMovies.forEach(item => {
                    const hasDesired = item.genre_ids?.some(g => desiredMovieRecommendationGenres.includes(g));
                    const hasExcluded = item.genre_ids?.some(g => excludedMovieRecommendationGenres.includes(g));

                    if (
                        !seenIds.has(item.id) &&
                        !commonBlacklistedIds.includes(item.id) &&
                        !item.adult &&
                        hasDesired && 
                        !hasExcluded
                    ) {
                        availableFallbackMovies.push(item);
                        seenIds.add(item.id);
                    }
                });
                page++;
            }
            for (let i = 0; i < availableFallbackMovies.length && finalRecommendations.length < MIN_RECOMMENDATIONS_COUNT; i++) {
                finalRecommendations.push(availableFallbackMovies[i]);
            }

        } catch (innerError) {
            console.error("[getMovieDetails - Movie] Error fetching fallback movie content:", innerError);
        }
        console.log(`[getMovieDetails - Movie] Fallback Movie recommendations count: ${finalRecommendations.length}`);
        console.log(`it isss final ${finalRecommendations}`)
        return { data: { results: finalRecommendations } };
      }
    }
  }

  // ======== جلب التفاصيل الأساسية ========
  if (query?.length > 0) {
    endpoint += `/${query}`;
  }

  try {
    const result = await axios.get(endpoint, getConfig(tmdbLanguage));
    return result;
  } catch (e) {
    console.error("[getMovieDetails] Error fetching details:", e); 
    throw e;
  }
}


export async function getLikedMovies(watchlist, language) {
  const tmdbLanguage = languageMap[language] || "en-US";

  const itemPromises = watchlist.map(async (item) => {
    const endpoint = getDetailsEndPoint(item.mediaType)+item.id;

    try {
      const response = await axios.get(endpoint,getConfig(tmdbLanguage));
      return { ...response.data, mediaType: item.mediaType };
    } catch (error) {
      console.error(
        `Failed to fetch ${item.mediaType} with ID ${item.id}:`,
        error
      );
      return null;
    }
  });

  const results = await Promise.all(itemPromises);
  return results;
}