const { Client } = require("@elastic/elasticsearch");
const User = require("../models/user.models");
const client = new Client({
  node: "http://localhost:9200",
});


const findUserFromElasticSearch = async (value, page, fromDate, ToDate) => {
    page = Math.round(page);
    let allowed = Number(page) * 10;
    console.log(
      value.match(/last(\d*)\b/i) 
    ,value);
    if (value === new RegExp(/ *last*/, "i")) {
      console.log("We are getting Keywords");
    }
    if (
      value !== "" &&
      (fromDate && ToDate) !== "" &&
      (fromDate && ToDate) !== undefined
    ) {
      const result = await client.search({
        index: "users",
        body: {
          size: 10,
          from: allowed,
          query: {
            // fuzzy: { metadata:{value,fuzziness:"AUTO"}},
            bool: {
              must: [
                {
                  range: {
                    createdAt: {
                      gte: new Date(fromDate).toISOString().slice(0, 10),
                      lte: new Date(ToDate).toISOString().slice(0, 10),
                    },
                  },
                },
                {
                  regexp: {
                    metadata: {
                      value: `${value}.*`,
                      flags: "ALL",
                      case_insensitive: true,
                      max_determinized_states: 10000,
                      rewrite: "constant_score_blended",
                    },
                  },
                },
              ],
            },
  
            //  match: { skill:"react"},
            //
          },
        },
      });
      return result;
    } else if (
      value === "" &&
      (fromDate && ToDate) !== "" &&
      (fromDate && ToDate) !== undefined
    ) {
      console.log(new Date(ToDate).toISOString().slice(0, 10));
      const result = await client.search({
        index: "users",
        body: {
          size: 10,
          from: allowed,
          sort: [
            {
              createdAt: {
                order: "desc",
              },
            },
          ],
          query: {
            //  match: { metadata:"sri"},
            //  match: { skill:"react"},
            //
  
            range: {
              createdAt: {
                gte: new Date(fromDate).toISOString().slice(0, 10),
                lte: new Date(ToDate).toISOString().slice(0, 10),
              },
            },
          },
        },
      });
      console.log(result, "REFER IT");
      return result;
    } else {
      const result = await client.search({
        index: "users",
        body: {
          size: 10,
          from: allowed,
          query: {
            // fuzzy: { metadata:{value,fuzziness:"AUTO"}},
  
            regexp: {
              metadata: {
                value: `${value}.*`,
                flags: "ALL",
                case_insensitive: true,
                max_determinized_states: 10000,
                rewrite: "constant_score_blended",
              },
            },
  
            //  match: { skill:"react"},
            //
          },
        },
      });
      return result;
    }
  };

  
  module.exports={findUserFromElasticSearch}