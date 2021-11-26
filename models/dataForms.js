const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataForms = new Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    company: [
      {
        id:  Number,
        companyName:  String,
        workers: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const dataFrom = mongoose.model("dataFrom", dataForms);
module.exports = dataFrom;



// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const dataForms = new Schema(
//   {
//     cityName: {
//       type: String,
//       required: true,
//     },

//     company: {
//       type: Schema.Types.ObjectId, 
//       ref: "Company",
//     },


//     //   Opinion {
//     //     _id: string;
//     //     creator: string;
//     //     teacher: {
//     //         type: Schema.Types.ObjectId, ref: 'Teacher'
//     //     },
//     //     text: string;
//     //     date: Date;
//     //   }

//     // Teacher {
//     //   _id: string;
//     //   name: string;
//     //   isVerified: boolean;
//     // }

//   },
//   {
//     timestamps: true,
//   }
// );


// const company = new Schema({
//  companyName: {
//       type: String,
//       required: true,
//     },

//   workers: {
//       type: Schema.Types.ObjectId, 
//       ref: "Company",
//     },
//   },
//     {
//       timestamps: true,
//     }
//   );

// const workers = new Schema({
// workers:[
  
// ]
// },
//     {
//       timestamps: true,
//     }
//   );

// const dataFrom = mongoose.model("dataFrom", dataForms);
// module.exports = dataFrom;