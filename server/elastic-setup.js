const { Client } = require("@elastic/elasticsearch");
const User = require("../models/user.models");
const client = new Client({
  node: "http://localhost:9200",
});

const connectElasticServer = async () => {
  try {
    const createIndex = async (indexName) => {
      await client.indices.create({ index: indexName });
      console.log("Index created");
    };
    const removeIndex = async (indexName) => {
      await client.indices.delete({ index: "posts" });
      console.log("Index removed");
    };
    // removeIndex()
    await createIndex("users");

    const user = await User.find({})
      .populate("education")
      .populate("skill")
      .select(
        "_id name email role displayPicture skill education createdAt updatedAt"
      );
    const bio = user.map((user) => {
      let id = user._id;
      let metadata = user.name + " " + user.email + " " + user.role;
      let skill = "";
      if (user.skill.length !== 0) {
        let skills = user.skill.map((x) => x.skill);
        console.log(skills.toString());
        skill = skills.toString();
        metadata = metadata + " " + skill;
      }
      let edu = "";
      if (user.education.length !== 0) {
        // console.log(user.education);

        let education = user.education.map((x) => {
          let eduString =
            x.collegeName +
            " " +
            x.degree +
            " " +
            x.stream +
            " " +
            x.graduationYear +
            " " +
            x.registerNumber;
          return (edu = edu + eduString);
        });
        // console.log(education);
        // skill=skills.toString()
        metadata = metadata + " " + edu;
      }

      return {
        name: user.name,
        email: user.email,
        role: user.role,
        skill: skill,
        education: user.education,
        displayPicture: user.displayPicture,
        id,
        metadata,
        createdAt: new Date(user.createdAt).toISOString().slice(0, 10),
        updatedAt: user.updatedAt,
      };
    });

    // console.log(bio);

    bio.map(async (x) => {
      console.log(x, "USER ALKMDLKDFLKSDKLJSKLDJLKSDJJLKSJD");
      const results = await client.index({
        index: "users",
        document: {
          ...x,
        },
      });
      console.log(results);
    });
    console.log(
      "---------------------------------------------------------------------------"
    );

    console.log(
      "---------------------------------------------------------------------------"
    );
    console.log(
      "---------------------------------------------------------------------------"
    );
    console.log(
      "---------------------------------------------------------------------------"
    );
    console.log(
      "---------------------------------------------------------------------------"
    );
    console.log(
      "---------------------------------------------------------------------------"
    );
    console.log(
      "---------------------------------------------------------------------------"
    );
    console.log(
      "---------------------------------------------------------------------------"
    );
    console.log(
      "---------------------------------------------------------------------------"
    );

    //  Metadata is the input field
    // const result = await client.search({
    //     index: "posts",
    //     body: {
    //         query: {
    //         //  match: { metadata:"sri"},
    //         //  match: { skill:"react"},
    //         regexp:{
    //           metadata:{
    //             "value": "ran.+",
    //             "flags": "ALL",
    //             "case_insensitive": true,
    //             "max_determinized_states": 10000,
    //             "rewrite": "constant_score_blended"
    //           }
    //         }

    //         }
    //       }
    //   });

    // console.log(result.hits.hits)
    return client;
  } catch (error) {
    console.log(error);
    return 1;
  }
};
 connectElasticServer()
