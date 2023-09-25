// import React, { useEffect, useState } from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
//   Font,
//   Svg
// } from "@react-pdf/renderer";
// import { fontSize } from "@mui/system";
// import { RxDotFilled } from "react-icons/rx";
// // import { ImLocation2 } from "react-icons/im";
// // import { HiMail } from "react-icss/hi";
// import CircleIcon from "@mui/icons-material/Circle";

// // Create Document Component
// const MyDocument = (props) => {
//   // console.log(props.data, "mmmmmmmm");
//   // const data = props.data;

//   return (
//     <Document>
//       <Page style={styles.body}>
//         <View>
//           {data && (
//             <View>
//               <View>
//                 <Text style={styles.name}>{data.personal[0].fullName}</Text>
//               </View>
//               <View style={{display:"flex", flexDirection:"row",fontSize:"16px"}}>
//                 <Text>{data.personal[0].hometown}</Text>
              
//                 <Text>{data.email}</Text>
//               </View>
//             </View>
//           )}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// Font.register({
//   family: "Oswald",
//   src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
// });

// const styles = StyleSheet.create({
//   body: {
//     paddingTop: 35,
//     paddingBottom: 65,
//     paddingHorizontal: 35,
//   },

//   pageNumber: {
//     position: "absolute",
//     fontSize: 12,
//     bottom: 30,
//     left: 0,
//     right: 0,
//     textAlign: "center",
//     color: "grey",
//   },
//   name: {
//     textAlign: "center",
//     textTransform: "uppercase",
//     fontWeight: "extrabold",
//     fontSize: 30,
//   },
 
// });

// export default MyDocument;
