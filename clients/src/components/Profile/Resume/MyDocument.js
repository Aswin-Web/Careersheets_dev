import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  Svg,
} from "@react-pdf/renderer";
import RobotoRegular from "./assets/roboto/Roboto-Regular.ttf";
import RobotoBold from "./assets/roboto/Roboto-Bold.ttf";
import RobotoMedium from "./assets/roboto/Roboto-Medium.ttf";

// Create Document Component
const MyDocument = (props) => {
  // console.log(props.data, "mmmmmmmm");
  const data = props.data;

  console.log(data, "pppppppppppppppppppppppppppppppp  ");
  return (
    <Document>
      <Page style={styles.body}>
        <View>
          {data && (
            <View style={{ marginTop: "5px" }}>
              <View>
                {data.personal[0] ? (
                  <Text style={styles.name}>{data.personal[0].fullName}</Text>
                ) : (
                  <Text style={styles.name}>{data.name}</Text>
                )}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "14px",
                  gap: "10px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                {data.personal[0] ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {data.personal[0].hometown ? (
                      <>
                        <Image
                          style={{ height: "10x", width: "10px" }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAADT09OgoKDFxcVoaGiUlJSvr6/Ozs7Y2Nijo6P09PRTU1OQkJBkZGSZmZmpqank5OR+fn5vb28qKiq/v7/q6urx8fHe3t63t7c4ODhaWlo/Pz8KCgqCgoJfX18VFRVERER2dnZLS0sfHx87OzswMDAZGRkWeO8lAAADj0lEQVR4nO3ciVbiQBSEYZrIJiBLWEQQBUXf/w2HDOSgGExC+lY1M/U9Qf4TJeklXauJiIiIiIiIiIiIiIiIiIiIiIiIiIiIlNatL5rb5dOrSzw/9eJ+qz1nX5Q3nejBZVsO2uyLq6zbulSX6g1v+V4uejl5B6sh+0KvMxoXyjuIO+zLLa1e7PZ9uZF37EsupbMp2ZeY3E7jbHlF39/7+Mi+9GL6V/YltuyLL6D+XCFwb8oOyLOu1rf3wE741WxSOXAv4CfH1EffXrBvAFV+Yr6L2SnZGt4CnduwY7K8eQzcP/7ZOT/tvAY699plF53xHRhc4sZ7oHPv7KivXgwCnXtiZ51Uf5HJ9sIOS7WMAp3rs9MOHs0CnQtjyGgY6FwI01R5k2nV7Nh5/t62LxmwA7vGgc7NyIU+X7ezrbiBdfNA5xbUQi9j+jzMwAUi0DWJhZBA53ijDLvXte94L28Vp0aLYwVaP+xPIlLhClZIuokjXCBpjGE17s3CGQsDAzkPjDa0sEUoLLNMX12PUAgNZPyaWs7OZMH/mt6DC9fwQptJ4MvwSzXgQPzzYgYvRG/yw711p+7BhQN4IXqrTQwvRC98A0dOKXAhPvA/KMROfs8JhditUsjxfQr7ZtohFGJ3LSLWK85h1y9UqMLwC9Ej/AT2txQ/eEIPn+yX738Cf6pAKARvWYAtrJ1gAz3vCA6xEDvjnUDPeqOnS/ETpth1mQR6bQY/QIR/SQP/MUUH1rbgQPw3Jqi9NCn8xij0m2kdXojZtHeCD6w1oYGMr9mwQ0TKhpp3ZCEjsBYBA8eUQuQomPShvv0u9hTrGy/cxDftI/0NqpAVCBtCMTa1HYFWgnmBoKlv6icliJ1RH8xAyFCffEyG/b4a+pE15oModqD5in4AXwLb/p3S/0YTlhP8gZyrYFjI/kT2yG60H8A/4YHVZlP6d9wnNsN9zsD+AotvoAI71sz/euKSnXTO910M5uSWE78zxEGeZ+ZzrSaQg2nO+ZvU4B6j8Iu5p4FGyMeY+lg3De5H9Lu7yoHEibWCqs2Ev4VwbFKe9uf1gcGfQHs0vLKPeYhJWdc8/tdhHZSYq+xwo39jfYlp8WPZd8E+4nPMo48CeZ/NEftCq5gNfz+gvRfddN5RZ7jNupeT+J6wDcjOrL2I+uO40WjE4360aP8Lt05ERERERERERERERERERERERERERERERERETPwB76g8UgSSGiUAAAAASUVORK5CYII="
                        />
                        <Text style={{ marginLeft: "5px" }}>
                          {data.personal[0].hometown}
                        </Text>
                      </>
                    ) : (
                      ""
                    )}
                  </View>
                ) : (
                  <Text>{""}</Text>
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ height: "10px", width: "10px" }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAADT09OgoKDFxcVoaGiUlJSvr6/Ozs7Y2Nijo6P09PRTU1OQkJBkZGSZmZmpqank5OR+fn5vb28qKiq/v7/q6urx8fHe3t63t7c4ODhaWlo/Pz8KCgqCgoJfX18VFRVERER2dnZLS0sfHx87OzswMDAZGRkWeO8lAAADj0lEQVR4nO3ciVbiQBSEYZrIJiBLWEQQBUXf/w2HDOSgGExC+lY1M/U9Qf4TJeklXauJiIiIiIiIiIiIiIiIiIiIiIiIiIiIlNatL5rb5dOrSzw/9eJ+qz1nX5Q3nejBZVsO2uyLq6zbulSX6g1v+V4uejl5B6sh+0KvMxoXyjuIO+zLLa1e7PZ9uZF37EsupbMp2ZeY3E7jbHlF39/7+Mi+9GL6V/YltuyLL6D+XCFwb8oOyLOu1rf3wE741WxSOXAv4CfH1EffXrBvAFV+Yr6L2SnZGt4CnduwY7K8eQzcP/7ZOT/tvAY699plF53xHRhc4sZ7oHPv7KivXgwCnXtiZ51Uf5HJ9sIOS7WMAp3rs9MOHs0CnQtjyGgY6FwI01R5k2nV7Nh5/t62LxmwA7vGgc7NyIU+X7ezrbiBdfNA5xbUQi9j+jzMwAUi0DWJhZBA53ijDLvXte94L28Vp0aLYwVaP+xPIlLhClZIuokjXCBpjGE17s3CGQsDAzkPjDa0sEUoLLNMX12PUAgNZPyaWs7OZMH/mt6DC9fwQptJ4MvwSzXgQPzzYgYvRG/yw711p+7BhQN4IXqrTQwvRC98A0dOKXAhPvA/KMROfs8JhditUsjxfQr7ZtohFGJ3LSLWK85h1y9UqMLwC9Ej/AT2txQ/eEIPn+yX738Cf6pAKARvWYAtrJ1gAz3vCA6xEDvjnUDPeqOnS/ETpth1mQR6bQY/QIR/SQP/MUUH1rbgQPw3Jqi9NCn8xij0m2kdXojZtHeCD6w1oYGMr9mwQ0TKhpp3ZCEjsBYBA8eUQuQomPShvv0u9hTrGy/cxDftI/0NqpAVCBtCMTa1HYFWgnmBoKlv6icliJ1RH8xAyFCffEyG/b4a+pE15oModqD5in4AXwLb/p3S/0YTlhP8gZyrYFjI/kT2yG60H8A/4YHVZlP6d9wnNsN9zsD+AotvoAI71sz/euKSnXTO910M5uSWE78zxEGeZ+ZzrSaQg2nO+ZvU4B6j8Iu5p4FGyMeY+lg3De5H9Lu7yoHEibWCqs2Ev4VwbFKe9uf1gcGfQHs0vLKPeYhJWdc8/tdhHZSYq+xwo39jfYlp8WPZd8E+4nPMo48CeZ/NEftCq5gNfz+gvRfddN5RZ7jNupeT+J6wDcjOrL2I+uO40WjE4360aP8Lt05ERERERERERERERERERERERERERERERERETPwB76g8UgSSGiUAAAAASUVORK5CYII="
                  />
                  <Text style={{ marginLeft: "3px", marginTop: "-2px" }}>
                    {data.email}
                  </Text>
                </View>
                {data.personal[0] ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {data.personal[0].phone ? (
                      <>
                        {" "}
                        <Image
                          style={{
                            height: "10x",
                            width: "10px",
                            marginRight: "5px",
                          }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAADT09OgoKDFxcVoaGiUlJSvr6/Ozs7Y2Nijo6P09PRTU1OQkJBkZGSZmZmpqank5OR+fn5vb28qKiq/v7/q6urx8fHe3t63t7c4ODhaWlo/Pz8KCgqCgoJfX18VFRVERER2dnZLS0sfHx87OzswMDAZGRkWeO8lAAADj0lEQVR4nO3ciVbiQBSEYZrIJiBLWEQQBUXf/w2HDOSgGExC+lY1M/U9Qf4TJeklXauJiIiIiIiIiIiIiIiIiIiIiIiIiIiIlNatL5rb5dOrSzw/9eJ+qz1nX5Q3nejBZVsO2uyLq6zbulSX6g1v+V4uejl5B6sh+0KvMxoXyjuIO+zLLa1e7PZ9uZF37EsupbMp2ZeY3E7jbHlF39/7+Mi+9GL6V/YltuyLL6D+XCFwb8oOyLOu1rf3wE741WxSOXAv4CfH1EffXrBvAFV+Yr6L2SnZGt4CnduwY7K8eQzcP/7ZOT/tvAY699plF53xHRhc4sZ7oHPv7KivXgwCnXtiZ51Uf5HJ9sIOS7WMAp3rs9MOHs0CnQtjyGgY6FwI01R5k2nV7Nh5/t62LxmwA7vGgc7NyIU+X7ezrbiBdfNA5xbUQi9j+jzMwAUi0DWJhZBA53ijDLvXte94L28Vp0aLYwVaP+xPIlLhClZIuokjXCBpjGE17s3CGQsDAzkPjDa0sEUoLLNMX12PUAgNZPyaWs7OZMH/mt6DC9fwQptJ4MvwSzXgQPzzYgYvRG/yw711p+7BhQN4IXqrTQwvRC98A0dOKXAhPvA/KMROfs8JhditUsjxfQr7ZtohFGJ3LSLWK85h1y9UqMLwC9Ej/AT2txQ/eEIPn+yX738Cf6pAKARvWYAtrJ1gAz3vCA6xEDvjnUDPeqOnS/ETpth1mQR6bQY/QIR/SQP/MUUH1rbgQPw3Jqi9NCn8xij0m2kdXojZtHeCD6w1oYGMr9mwQ0TKhpp3ZCEjsBYBA8eUQuQomPShvv0u9hTrGy/cxDftI/0NqpAVCBtCMTa1HYFWgnmBoKlv6icliJ1RH8xAyFCffEyG/b4a+pE15oModqD5in4AXwLb/p3S/0YTlhP8gZyrYFjI/kT2yG60H8A/4YHVZlP6d9wnNsN9zsD+AotvoAI71sz/euKSnXTO910M5uSWE78zxEGeZ+ZzrSaQg2nO+ZvU4B6j8Iu5p4FGyMeY+lg3De5H9Lu7yoHEibWCqs2Ev4VwbFKe9uf1gcGfQHs0vLKPeYhJWdc8/tdhHZSYq+xwo39jfYlp8WPZd8E+4nPMo48CeZ/NEftCq5gNfz+gvRfddN5RZ7jNupeT+J6wDcjOrL2I+uO40WjE4360aP8Lt05ERERERERERERERERERERERERERERERERETPwB76g8UgSSGiUAAAAASUVORK5CYII="
                        />
                        <Text>{data.personal[0].phone}</Text>
                      </>
                    ) : (
                      ""
                    )}
                  </View>
                ) : (
                  <Text>{""}</Text>
                )}
                ) : (<Text>{""}</Text>)
              </View>
              {/* Summary section */}
              {data.summary && (
                <>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "28px",
                    }}
                  >
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "37%",
                      }}
                    ></View>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontFamily: "Roboto",
                        fontStyle: "medium",
                      }}
                    >
                      Profile Summary
                    </Text>
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "37%",
                      }}
                    ></View>
                  </View>
                  <View style={{ marginTop: "10px" }}>
                    <Text
                      style={{
                        fontSize: "13px",
                        lineHeight: "1.3px",
                        textAlign: "justify",
                        textIndent: "32px",
                      }}
                    >
                      {data.summary}
                    </Text>
                  </View>
                </>
              )}
              {/* skills section */}
              {data.skill.length !== 0 && (
                <>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "28px",
                    }}
                  >
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "44%",
                      }}
                    ></View>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontFamily: "Roboto",
                        fontStyle: "medium",
                      }}
                    >
                      Skills
                    </Text>
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "44%",
                      }}
                    ></View>
                  </View>
                  {/* skill items */}

                  <View
                    style={{
                      maxHeight: "120px",
                      padding: "5px 20px",
                      display: "flex",
                      flexWrap: "wrap",
                      alignContent: "space-around",
                      marginTop: "8px",
                    }}
                  >
                    {data.skill.map((item) => (
                      <View style={styles.list}>
                        <Image
                          style={styles.icon}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAADT09OgoKDFxcVoaGiUlJSvr6/Ozs7Y2Nijo6P09PRTU1OQkJBkZGSZmZmpqank5OR+fn5vb28qKiq/v7/q6urx8fHe3t63t7c4ODhaWlo/Pz8KCgqCgoJfX18VFRVERER2dnZLS0sfHx87OzswMDAZGRkWeO8lAAADj0lEQVR4nO3ciVbiQBSEYZrIJiBLWEQQBUXf/w2HDOSgGExC+lY1M/U9Qf4TJeklXauJiIiIiIiIiIiIiIiIiIiIiIiIiIiIlNatL5rb5dOrSzw/9eJ+qz1nX5Q3nejBZVsO2uyLq6zbulSX6g1v+V4uejl5B6sh+0KvMxoXyjuIO+zLLa1e7PZ9uZF37EsupbMp2ZeY3E7jbHlF39/7+Mi+9GL6V/YltuyLL6D+XCFwb8oOyLOu1rf3wE741WxSOXAv4CfH1EffXrBvAFV+Yr6L2SnZGt4CnduwY7K8eQzcP/7ZOT/tvAY699plF53xHRhc4sZ7oHPv7KivXgwCnXtiZ51Uf5HJ9sIOS7WMAp3rs9MOHs0CnQtjyGgY6FwI01R5k2nV7Nh5/t62LxmwA7vGgc7NyIU+X7ezrbiBdfNA5xbUQi9j+jzMwAUi0DWJhZBA53ijDLvXte94L28Vp0aLYwVaP+xPIlLhClZIuokjXCBpjGE17s3CGQsDAzkPjDa0sEUoLLNMX12PUAgNZPyaWs7OZMH/mt6DC9fwQptJ4MvwSzXgQPzzYgYvRG/yw711p+7BhQN4IXqrTQwvRC98A0dOKXAhPvA/KMROfs8JhditUsjxfQr7ZtohFGJ3LSLWK85h1y9UqMLwC9Ej/AT2txQ/eEIPn+yX738Cf6pAKARvWYAtrJ1gAz3vCA6xEDvjnUDPeqOnS/ETpth1mQR6bQY/QIR/SQP/MUUH1rbgQPw3Jqi9NCn8xij0m2kdXojZtHeCD6w1oYGMr9mwQ0TKhpp3ZCEjsBYBA8eUQuQomPShvv0u9hTrGy/cxDftI/0NqpAVCBtCMTa1HYFWgnmBoKlv6icliJ1RH8xAyFCffEyG/b4a+pE15oModqD5in4AXwLb/p3S/0YTlhP8gZyrYFjI/kT2yG60H8A/4YHVZlP6d9wnNsN9zsD+AotvoAI71sz/euKSnXTO910M5uSWE78zxEGeZ+ZzrSaQg2nO+ZvU4B6j8Iu5p4FGyMeY+lg3De5H9Lu7yoHEibWCqs2Ev4VwbFKe9uf1gcGfQHs0vLKPeYhJWdc8/tdhHZSYq+xwo39jfYlp8WPZd8E+4nPMo48CeZ/NEftCq5gNfz+gvRfddN5RZ7jNupeT+J6wDcjOrL2I+uO40WjE4360aP8Lt05ERERERERERERERERERERERERERERERERETPwB76g8UgSSGiUAAAAASUVORK5CYII="
                        />

                        <Text style={{ fontSize: "13px" }}>{item.skill}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}

              {/* Education Section */}
              {data.education.length !== 0 && (
                <>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "41%",
                      }}
                    ></View>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontFamily: "Roboto",
                        fontStyle: "medium",
                      }}
                    >
                      Education
                    </Text>
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "41%",
                      }}
                    ></View>
                  </View>
                  {/* Education items */}
                  <View
                    style={{
                      marginTop: "8px",
                      padding: "10px",
                      lineHeight: "1.4px",
                    }}
                  >
                    {data.education.map((edu) => (
                      <View key={edu._id} style={{ marginBottom: "10px" }}>
                        <Text
                          style={{
                            fontSize: "14px",
                            fontFamily: "Roboto",
                            fontStyle: "bold",
                          }}
                        >
                          {edu.collegeName}
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontSize: "13px",
                          }}
                        >
                          <Text>Degree : </Text>
                          <Text
                            style={{
                              fontFamily: "Roboto",
                              fontStyle: "medium",
                            }}
                          >
                            {" "}
                            {edu.degree}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontSize: "13px",
                          }}
                        >
                          <Text>Branch : </Text>
                          <Text
                            style={{
                              fontFamily: "Roboto",
                              fontStyle: "medium",
                            }}
                          >
                            {" "}
                            {edu.stream}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontSize: "13px",
                          }}
                        >
                          <Text>Graduation Year : </Text>
                          <Text
                            style={{
                              fontFamily: "Roboto",
                              fontStyle: "medium",
                            }}
                          >
                            {" "}
                            {edu.graduationYear}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </>
              )}
              {/* Project section */}
              {data.project.length !== 0 && (
                <View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "41%",
                      }}
                    ></View>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontFamily: "Roboto",
                        fontStyle: "medium",
                      }}
                    >
                      Projects
                    </Text>
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "41%",
                      }}
                    ></View>
                  </View>
                  {/* PROJECTS*/}
                  <View
                    style={{
                      padding: "10px",
                      lineHeight: "1.2px",
                      marginBottom: "-14px",
                      display: "flex",
                      gap: "50px",
                    }}
                  >
                    {data.project.map((item) => (
                      <View
                        style={{ lineHeight: "1.3px", marginBottom: "16px" }}
                        key={item._id}
                      >
                        <Text
                          style={{
                            fontSize: "14px",
                            fontFamily: "Roboto",
                            fontStyle: "bold",
                          }}
                        >
                          {item.projectTitle}
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontSize: "13px",
                          }}
                        >
                          <Text>Project Domain : </Text>
                          <Text
                            style={{
                              fontFamily: "Roboto",
                              fontStyle: "medium",
                            }}
                          >
                            {" "}
                            {item.projectDomain}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",

                            fontSize: "13px",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Roboto",
                              fontStyle: "medium",
                            }}
                          >
                            Project Description :-{" "}
                          </Text>
                          <Text
                            style={{
                              fontSize: "13px",
                              lineHeight: "1.3px",
                              textAlign: "justify",
                              textIndent: "32px",
                            }}
                          >
                            {" "}
                            {item.projectDescription.replace(/\n+/g, " ")}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Certification Information section */}

              {data.certification.length !== 0 && (
                <View style={{ marginTop: "10px" }}>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "35%",
                      }}
                    ></View>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontFamily: "Roboto",
                        fontStyle: "medium",
                      }}
                    >
                      Certification
                    </Text>
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "35%",
                      }}
                    ></View>
                  </View>

                  {/* Certification Information */}

                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    {data.certification.map((cert) => (
                      <View
                        key={cert._id}
                        style={{
                          width: "48%",   
                          padding: 12,
                          borderRadius: 8,
                          marginBottom: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            marginBottom: 15,
                          }}
                        >
                          {cert.certificationName}
                        </Text>
                        <Text style={{ fontSize: 13, marginBottom: 10, }}>
                          <Text style={{ fontWeight: "bold" }}>Issued By:</Text>{" "}
                          {cert.issuedBy}
                        </Text>
                        <Text style={{ fontSize: 13 , marginBottom: 10,}}>
                          <Text style={{ fontWeight: "bold" }}>
                            Certificate ID:
                          </Text>{" "}
                          {cert.certificateId}
                        </Text>
                        <Text style={{ fontSize: 13, marginBottom: 10, }}>
                          <Text style={{ fontWeight: "bold" }}>
                            Issued Date:
                          </Text>{" "}
                          {new Date(cert.startDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Personal Information section */}

              {data.personal.length !== 0 && (
                <View style={{ marginTop: "10px" }}>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "35%",
                      }}
                    ></View>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontFamily: "Roboto",
                        fontStyle: "medium",
                      }}
                    >
                      Personal Information
                    </Text>
                    <View
                      style={{
                        borderBottom: "0.8px",
                        borderColor: "black",
                        borderStyle: "bold",
                        width: "35%",
                      }}
                    ></View>
                  </View>
                  {/* Personal Information */}
                  <View>
                    {data.personal.map((info) => (
                      <View
                        style={{ padding: "10px 30px", lineHeight: "1.5px" }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontSize: "13px",
                          }}
                        >
                          <Text>Gender : </Text>
                          <Text>{info.gender}</Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontSize: "13px",
                          }}
                        >
                          <Text>DOB : </Text>
                          <Text>{info.dateOfBirth}</Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                          }}
                        >
                          <Text style={{ fontSize: "13px" }}>
                            Languages Known :
                          </Text>
                          {info.languages.map((lan) => (
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                rowGap: "32px",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: "13px",
                                  display: "flex",
                                  flexDirection: "row",
                                  marginLeft: "5px",
                                }}
                              >
                                <Image
                                  style={styles.icon}
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAADT09OgoKDFxcVoaGiUlJSvr6/Ozs7Y2Nijo6P09PRTU1OQkJBkZGSZmZmpqank5OR+fn5vb28qKiq/v7/q6urx8fHe3t63t7c4ODhaWlo/Pz8KCgqCgoJfX18VFRVERER2dnZLS0sfHx87OzswMDAZGRkWeO8lAAADj0lEQVR4nO3ciVbiQBSEYZrIJiBLWEQQBUXf/w2HDOSgGExC+lY1M/U9Qf4TJeklXauJiIiIiIiIiIiIiIiIiIiIiIiIiIiIlNatL5rb5dOrSzw/9eJ+qz1nX5Q3nejBZVsO2uyLq6zbulSX6g1v+V4uejl5B6sh+0KvMxoXyjuIO+zLLa1e7PZ9uZF37EsupbMp2ZeY3E7jbHlF39/7+Mi+9GL6V/YltuyLL6D+XCFwb8oOyLOu1rf3wE741WxSOXAv4CfH1EffXrBvAFV+Yr6L2SnZGt4CnduwY7K8eQzcP/7ZOT/tvAY699plF53xHRhc4sZ7oHPv7KivXgwCnXtiZ51Uf5HJ9sIOS7WMAp3rs9MOHs0CnQtjyGgY6FwI01R5k2nV7Nh5/t62LxmwA7vGgc7NyIU+X7ezrbiBdfNA5xbUQi9j+jzMwAUi0DWJhZBA53ijDLvXte94L28Vp0aLYwVaP+xPIlLhClZIuokjXCBpjGE17s3CGQsDAzkPjDa0sEUoLLNMX12PUAgNZPyaWs7OZMH/mt6DC9fwQptJ4MvwSzXgQPzzYgYvRG/yw711p+7BhQN4IXqrTQwvRC98A0dOKXAhPvA/KMROfs8JhditUsjxfQr7ZtohFGJ3LSLWK85h1y9UqMLwC9Ej/AT2txQ/eEIPn+yX738Cf6pAKARvWYAtrJ1gAz3vCA6xEDvjnUDPeqOnS/ETpth1mQR6bQY/QIR/SQP/MUUH1rbgQPw3Jqi9NCn8xij0m2kdXojZtHeCD6w1oYGMr9mwQ0TKhpp3ZCEjsBYBA8eUQuQomPShvv0u9hTrGy/cxDftI/0NqpAVCBtCMTa1HYFWgnmBoKlv6icliJ1RH8xAyFCffEyG/b4a+pE15oModqD5in4AXwLb/p3S/0YTlhP8gZyrYFjI/kT2yG60H8A/4YHVZlP6d9wnNsN9zsD+AotvoAI71sz/euKSnXTO910M5uSWE78zxEGeZ+ZzrSaQg2nO+ZvU4B6j8Iu5p4FGyMeY+lg3De5H9Lu7yoHEibWCqs2Ev4VwbFKe9uf1gcGfQHs0vLKPeYhJWdc8/tdhHZSYq+xwo39jfYlp8WPZd8E+4nPMo48CeZ/NEftCq5gNfz+gvRfddN5RZ7jNupeT+J6wDcjOrL2I+uO40WjE4360aP8Lt05ERERERERERERERERERERERERERERERERETPwB76g8UgSSGiUAAAAASUVORK5CYII="
                                />
                                {lan}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: "10px",
              position: "sticky",
              bottom: 0,
              fontSize: "12px",
              color: "#808080",
            }}
          >
            Generated by CareerSheets
          </Text>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Roboto",
  fonts: [
    { src: RobotoBold, fontStyle: "bold" },
    { src: RobotoRegular, fontStyle: "normal" },
    { src: RobotoMedium, fontStyle: "medium" },
  ],
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Roboto",
  },

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  name: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "extrabold",
    fontSize: 28,
    fontStyle: "bold",
  },
  icon: {
    height: "8px",
    width: "8px",
  },

  list: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "8px",
    gap: "6px",
  },
});
export default MyDocument;
