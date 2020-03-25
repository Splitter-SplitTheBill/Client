import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { BackButton } from "../components";

import { profileUpdate } from "../actions/userAction";

import axios from "axios";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default function EditProfileScreen(props) {
  const dispatch = useDispatch();

  const getUser = useSelector(state => {
    return state.userReducer.UserLogin;
  });

  const token = useSelector(state => {
    return state.userReducer.token;
  });

  const [userData, setUserData] = useState(getUser);
  const userId = getUser._id;
  console.log(userData, "<<<<<<<userdata");

  const [image_url, setImange] = useState(userData.image_url);
  const [name, setName] = useState(userData.name);
  const [accounts, setAccount] = useState(userData.accounts);
  const [valueAcc, setValueAcc] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [accNamne, setAccNamne] = useState("");
  const [addStatus, setAddStatus] = useState(false);

  const data = [
    {
      value: "Gopay"
    },
    {
      value: "OVO"
    },
    {
      value: "Dana"
    },
    {
      value: "BNI"
    },
    {
      value: "BCA"
    },
    {
      value: "GENIUS"
    }
  ];

  const reGetData = () => {
    console.log("kepanggil");
    axios
      .get(`http://localhost:3000/users/${userData._id}`, {
        headers: {
          token: getUser.token
        }
      })
      .then(response => {
        console.log(response.data, "<<<< response data re get");
        setUserData(response.data);
      })
      .catch(err => {
        console.log(err, "<<<< ini error profile");
      });
  };

  // useEffect(() => {
  //   reGetData();
  // }, []);

  function editProfile() {
    console.log(getUser.token, "<<<<< token nih");
    axios({
      method: "PATCH",
      url: `http://localhost:3000/users/${userId}`,
      headers: {
        token: token
      },
      data: {
        name,
        accounts,
        friendList: userData.friendList,
        image_url
      }
    })
      .then(response => {
        console.log(response.data);
        console.log("berhasul bung");
        dispatch(editProfile(response.data));
        // setName(response.data.name);
        // setImange(response.data.image_url);

        // props.navigation.navigate("Profile");
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  function addAcc() {
    console.log("masuk");
    axios({
      method: "PATCH",
      url: `http://localhost:3000/users/${userId}/accounts`,
      headers: {
        token: userData.token
      },
      data: {
        name: accNamne,
        instance: valueAcc,
        accountNumber: accNumber
      }
    })
      .then(response => {
        console.log(response.data);
        console.log("berhasul bung");
        console.log(accounts);
        setAccNumber("");
        setAccNamne("");
        setAddStatus(false);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  function onChangeTextPress(value) {
    setValueAcc(value);
  }

  function deleteAcc(accId) {
    console.log(userData.token, "<<<<< token nih");
    axios({
      method: "PATCH",
      url: `http://localhost:3000/users/${userId}/accounts/${accId}`,
      headers: {
        token: userData.token
      }
    })
      .then(response => {
        console.log(response.data);
        console.log("berhasul bung");
        let tempAcc = accounts.filter(
          acc => acc._id !== response.data.successRemove._id
        );
        setAccount(tempAcc);
        console.log(accounts);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImange(result.uri);
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const back = () => {
    props.navigation.goBack();
  };

  return (
    <>
      <View style={{ marginLeft: 5 }}>
        <BackButton methods={back} />
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginTop: 40
              }}
            >
              <TouchableOpacity
                style={styles.textChangeImage}
                onPress={() => _pickImage()}
              >
              <Text
                style={{ color: "black", opacity: 0.5, textAlign: "center", fontFamily: 'ProximaNova-Regular' }}
              >
                  Change Profile Picture
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.textInput}>Name</Text>
              <TextInput
                editable
                maxLength={40}
                onChangeText={text => setName(text)}
                value={name}
                style={styles.inputLogin}
              ></TextInput>
              <View style={styles.buttonLogin}></View>
            </View>
            <View>
              <Text style={styles.textTitleAcc}>Account List</Text>
              {accounts.map(acc => {
                return (
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Text style={styles.AccDetailType}>{acc.instance}</Text>
                    <Text style={styles.AccDetailType}>{acc.name}</Text>
                    <Text style={styles.AccDetailType}>
                      {acc.accountNumber}
                    </Text>
                    <TouchableOpacity onPress={() => deleteAcc(acc._id)}>
                      <Image
                        style={{ width: 20, height: 20, marginLeft: 15 }}
                        source={{
                          uri:
                            "https://pngimage.net/wp-content/uploads/2018/05/delete-icon-png-red-2.png"
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => setAddStatus(!addStatus)}
                style={{
                  borderColor: "lightgrey",
                  borderRadius: 50,
                  width: 250,
                  paddingLeft: 3,
                }}
              >
                <Text
                  style={{
                    color: "#6597A0",
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  Add Account
                </Text>
              </TouchableOpacity>
              {!addStatus ? (
                <View></View>
              ) : (
                <View style={{ marginTop: 10 }}>
                  <Dropdown
                    dropdownOffset={{ top: 5 }}
                    containerStyle={{
                      borderWidth: 1,
                      borderColor: "lightgrey",
                      borderRadius: 50,
                      width: 250,
                      paddingLeft: 3,
                      marginBottom: 15
                    }}
                    rippleCentered={true}
                    inputContainerStyle={{ borderBottomColor: "transparent" }}
                    label="Methods"
                    data={data}
                    valueExtractor={({ value }) => value}
                    onChangeText={value => {
                      onChangeTextPress(value);
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        marginVertical: 10,
                        fontSize: 15,
                        fontWeight: "bold"
                      }}
                    >
                      Account Number
                    </Text>
                    <TextInput
                      editable
                      maxLength={40}
                      onChangeText={text => setAccNumber(text)}
                      value={accNumber}
                      style={styles.inputLogin}
                    ></TextInput>
                    <Text
                      style={{
                        marginVertical: 10,
                        fontSize: 15,
                        fontWeight: "bold"
                      }}
                    >
                      Account Name
                    </Text>
                    <TextInput
                      editable
                      maxLength={40}
                      onChangeText={text => setAccNamne(text)}
                      value={accNamne}
                      style={styles.inputLogin}
                    ></TextInput>
                    <TouchableOpacity onPress={() => addAcc()}>
                      <Image
                        style={{ width: 30, height: 30, marginLeft: 10 }}
                        source={{
                          uri:
                            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExIVFRMVFhcaFRUVGBUXFxUXGhUWFhUVFRcYHSggGBolHRgYITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFRAQFjcdHR03LS0wLS0tLSstKy0tLS0tKysrLS0tLS0tLSstLS0tLSstLSstLSstLS03LS0tNy0rK//AABEIAOAA4AMBIgACEQEDEQH/xAAcAAEBAAIDAQEAAAAAAAAAAAAAAQcIAgUGBAP/xABMEAABAgQDAwkCBwwKAwEAAAABAAIDERIhBDFBByJhBQYTMlFxgZGhQtEIFGJ0wdLwI0RSVJSjsbO0wsPTJENjcnOCkpOisiUzNBf/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8AzQxlNzkj21XCNfVY+irnU2HfdBXOmJDNRhpsVXMkKhmoxtVz6IIGyNWir97LRQOmadMuKrtzLXtQWu1OuSjN3PVWi1WuajN7PTsQQtvVpmuTzVlouJfenTJVwpy17UFa+QpOfvXFgpuVyDJirX3KNdVY99kEc0uMxkuT3VWCjn02Crm03HqgMdTYri1tJmclya2q59Fxa+qxy4IK8VXCrnzFIzUc6mw9VSyQq196CMNOeqgaZ1aZqtFWenYpXenTLigr97LRWq1OuSjt3LXtVotVrnwQRm7nqoWzNWirTVnp2IXyNOmXmgrzVkjXSEjmo4U3Hqq1kxUc/cg4sbTco9tVxkq11Vj32Uc+mw9UHJ7gRIZ+SQyBZ2fmo5lNwjW1XPcgjWkGZyVeKur7kD57v2sjjRYIKXAiQzUZu9bw1QslvePmjRVnoglJnPTPwVib3V9yV+z4Id3K80FDhKWuXipDEut714LnltUwOCJY1xxGIH9VCIpab2iRMm3FwJkdiw1zo2rco4ybel+LwjkyBNhlO1T51G2dwD2INieXec+DwpniMTCha0lwrI1lDG8fJeL5X24cnMtCZHjcWsDG+byHf8Vrk5xJJJmTck5k9pUQZqxG35+UPANA0L4pJ8QGD9K6523fGT3cNhh39Kf3wsTIpgy5D28Yv28LAP8AdMRv6SV22E2+tNo2BLR+FDign/S5o/SsGoqNm+RNsfJcWQfEiQHE/wBcwy/1MLgB3kL2nJfKUGOOkgxocWH+FDe148aStMF9GBxsWC8PhRHw3jJzHFrh4gzQbpvFXV9ypcJS1+la7c1NtmMgEMxTW4mHq6zIo41Ddd3ETPas0c1OeOD5QbXh403gTdBfuxG9s26jiJjig9Azd63hqpSZz0+hVu/naXYlfs6ZID97q+5UOAEjmo4UZa9qtE97x8kEhinre9RzSTMZKtNVihfTuoK8h1m5+SMcAJHPzRzabi+iBlVyg4sBB3suKPBPVy4WuqH1WySqi2eqCuIIkM/tNSHbret0op3vtdAK75IIAZzPV9JaKxL9XxlZK57vhPuXTc7OcsDk2AY8d1smMHWiP0YwfTog+vlvlnD4SA6NiIjYbGi5OZP4LQLucewLXnn7tYxONqhYcuw+GykDKLEHy3A7o+S3xJXmOefO7EcoxzFjOk0T6OECaITewDU9rsz3AAefQEREBERAREQEREBERAX64XEvhuD4b3Me0za5hLXNPaCLgr8kQZv2fbZZ0wOUSAbBuJaJA6ARgMv74te4Fys1w4jXNBBBmLEXnPIg6rSVZF2YbS4mAe2DiC6Jgycs3QDPrM1Le1viLzBDZZlut4TuoQZzHV+jVfnhMUyOxr4bg5jgHNc0zDgRMEFfrXLd8JoK8z6ufCyNIAkc/tJJUXzQMq3kEYCOtlxujwT1cuCB1dstUL6bZoK+Xs58EZL2s+PYpRTfNKar5aII2c75ccuCr/k5cErq3fXuSdNs5oPh5e5Xg4TDxMRGcGshtmTqTkGt7XE2A4rVLntzsjco4l0aKZNExChz3YTJ2aO09rtTwkB6fbPz0+O4k4eE6eGw7iBLKJFuHP4gXaPE6rHCAiIgIiICIiAi5NaTkCr0Z7D5FBwRc+jPYfIriQgiIiAiIgIiIMlbIdoJwUQYaO8/FYh3STaC8nOejCc9Ab23p7IQ3tLQZgkjx4LSVZ72H89emZ8Tju+6QgOjJ9plg0T7QZN7i3scVBmBnysuKjpztlwy4qzrtkldO7nxVFfL2c+HYjJe1nxUppvnolFV8kEYTPey4o+Y6uXC91yL6rZKB1Ns9UFcBK2fDPivA7YudZwWBLWOliMQTDhdrWy+6xB3AyB0L2r3oZTvfa61d2yc4vjnKUWkzhYf7jDF5bpPSOlxfO+oDUHhkREBERAREQEREGYdlPJgxLcPBfEjMh9FinkQYsSFNwjwmguoInZxF1k9+z/C6R8aTwxeI+ssf7DXSfh/m2L/AGmAs1hlN81B5Rmz/C6x8aDxxeI+ssN7c+S2YbEYaGwxHAQCZxXuiPM4rzd7rkdi2PLKr5LX74Rrp43D/N/4j0GJURFQREQEREBfbyNyk/DR4ceH1obpy0cMnNPAgkHgV8SINxOa/LTcVhocaGZzAn2kETBPHQ9jg4aLuGylfPjnwWCNgnOWhzsM82BFN/Ze6Q8GxS0D5w7sWdiyre+1kEYT7WXHtR5Ps5cFS6q2WqofTbNAeALtz80YAetn5KNZTc+iObVcd10HTc7eWThcHiMQf6uE4tnYF8pQxPi4tWnznEkkmZNyTmT2lbG/CD5Uo5NZCGcaOwH+6wOef+QYtcUBERAREQEREBERBnHYYBXh5/i2L/aYCzSwk2dl5LCmw5s34f5ti/2mAs2udVYeqDi8kdXLzWAPhHAfHcPL8X/iPWwLXU2PotffhGNljcP83/ivQYlREQEREBERAREQd7zJxxhYyEaqQ89G49gibgd/lcWv72hbY8k44xYMOIBKtjS5v4Lpb7fB0x4LTFbX7NOVulwrpz6weB2CPDZiD5PiPH+VB614Au3PzRjQRN2fko1tNz3WRzKrj1QRji6xyR7qbBcnuqsEY6mx9EGDfhJx9/BQwbBsV5HEmGAfQ+awqss/CLJ+O4dvZh5+cV/uCxMkBERAVaJkBRcoWY7wgy7yfsz+MVugYWB0bY0WE0xMTiGvPRxCypwbDIE5aL7H7How+9cJ+V4n+UslbPX/ANGijU4vF/r3r0zBTnr2KDCA2OxpT+K4T8rxP8pcWbH4x+9cJ+V4n+Us4FkzVp7lyearD1VGO+YfM/E4LENc9mHZBZBisa2FFixXF0SJDeSa2NtuLIj2htxmjX0iRzUY2m5QVjQ65zWPNo3MZ/KEaFFbDgxC2GWHpYsWFTJxcJdG1wdOZzlKWs7ZCe2q4Vc+qwzQYNfsfjD71wn5Xif5S5HY7GlP4rhPyvE/ylnBjqbH0UayRq096DB7Nj0Y/euE/K8T/KXTc8Nm7sJg4+IiQYMPowykwo8aIS50aGyRa9gFNLnXnOYC2JeKstO1eH22P/8ADYkagwf18NQauIiKgiIgLYfYZiqoYa72sKw/7WIxML/rR5LXhZz2GOvAHbh8T5NxMI/vFQZoY6qxyR7qTIZKvdVYIx1NiqD203CMbVc91lxY0tMzkj21XCDAPwjWf0vDP7YBb/piOP7yxGs5fCSws24OMMmmKx3eQxzf+rlg1AREQFyhZjvC4qgoNtNnrP6NFOoxeL/XvXpmGrPTsWuPJW2XEYdhZDwsAAvfEMzFM3vcXvN32EybaL7XbecYfvXD/nfrKDYAvkadPeuT203Hqtfht6xkpfFcN+c+so3bxjB964f879ZBsE1lQmc1GOqsV4LZ5z5i8oFgiwmMdEhxXgw5yAhRWQyCHEkzrB8CvfPdVYZqiPdTYKuZTcZox1NjmsY7UdouI5LxEKFCgwniJCrJiVzBrc2QpcLWQZOY2q59FGvmadPctfnbeMYfvXD/AJ36yp29YyUviuG/O/WUGwDzTlr2rw+2xn/hsSdSYP6+GsbM284wfeuH/O/WXTc7drGJx+GfhokCCxkQtLnMrq3Xh4lN0s2hBj5ERUEREBZw2H2iYf5riT4OxTG/uFYPWwGxHDhrz/Z4GA3xjxYuJl5EKDLj203CMZVcqMbTco9pcZjJUGvqsfRHOpsO+6ryDZufkjCB1s/NBj7bpyR0vJT3gEugRIcXwmYbvCTyfBayLc/lXk4R4MWDE/8AXFhvY7uc0t+laccoYN0GLEhPEnw3uY4djmktPqEHzoiICIiAiIgIiIM37DnSfh/m2L/aYCza5tNx6rCmwwivDz/FsX+0wFmpgIu7LzQVrKrn0WvvwjHTxuH+b/xXrYF4J6uXktf/AIRxHx3Dy/F/4j0GJEREBERAREQEREH64aA6I9rGCbnuDWjtLiAB5lbN7JME3osVGHUfiDDhEZGDh2Ngwz6OWvXNRtMR+IIthobogsT90syB49I5ju5pW0vMzkY4XA4aBKRZDbXLLpDvRf8AmXKDu2uqse+yOfTYeqryD1c/JGECzs/NUQspugbVfLRRgPtZcUfP2cuCCh9W79rLXfb9za6DGNxTB9zxLd46CKwAO7ptpPEhy2JcRK2fDPivPc+ubTcfgouHfIRDvQXH2Yjeqe43B4OKDURF+uKw7ob3Q3tLXscWuac2uaZOB7iF+SAiIgIiICIiDOGw1s34f5ti/wBpgLNYfVbJa87K+dmDwnRPxGIEOiFiGFtEZziYkWFEaRQwtpk06znosnP2u8j6Yog/4McfuKD3BfTbNa/fCNbLG4f5v/Fesks2u8j64ok/4Mc/uLDu2bnPhsfioMTDRDEYyDS5xa9u9W4yk8A5EeaDHyIioIiICIiAiLsuQsC2I8uiT6CE3pIxFjQCAGNP4T3EMHF08gUHvtl3NwxsRhoBFiRjMTnaGybcJDPFznF5GrYjTotiy+W79rrxGyvkJ8HCuxMVssVjHCLEAEujhylBggaBrTlpOWi9w0iV8+OfBIBbTfPRAyq+SjJ+1lx7UfOe7lwQK6rZJVTbPVV8vZz4IyXtZ8exBKKd7070lXfJRs53y45cFX/Jy4IMJbduZEyeUYDbgAYloGgsIwA8A7gAdCVhFbtRobXNLSAZiRBvOeYIWtO1fZ6/ARTHgtJwkQ2z+4uPsO+TPI+B0Lgx2iIgIiICIiAiIgIiICIiAiIgIiIP0gQXPc1jGlznENa0CZcSZAAaklZX2a80G4mM2EZPwmFeH4p4G7icSAQyC0+1DhgngZuOT2y6DmfzXjxIww0ASxcRv3aIQSMDBcJOn/buBlLNoNPWJo2Q5u8iwMHhoeHgtpbDbITlU52Ze7tcTdQdhKm+c/BKKt707lGfKy4qOnO2XDJUcqq7ZapXTbNHy9nPh2IyUt7PiggZTfNC2q+WijCSd7Liq8kdXLhdArq3ftZUGi2c0cABMZoy/W9bIJRLe8Zd6/HHYRmIY6HEaHMcCHNcAQQbGxX7Amcj1fSWiRLdXxldBrVtK2ZRMC50bDgvw0yZXLoQzPFzRczzAF5yqOOVuzHgMewhwBmLg9v0Gaw1z/2RB9UfCCl2ZYAZHt3WifiwHSbc3qDBaL6+UeTYsB1MVhaTcZFrh2scJtcOIJC+RUEREBERAREQEREBEXZcn8jPiN6RxbCgTkY0SYZPVrAN6I75LAT2yF0HwwILnuDGNLnOIDWtBJcTkABcle35oc1osSOIGGDYmLEjEjWdBwIJzDhZ8fORFmkbs3XZ33MfmBGxTQYTX4XCPArxMQAYnEtPWbBYCRBhkd853c8WGcuQOQsPg4Ag4eG2G0XkOs50us85udbMqD5eaPNiDybAEKEKi68SI7rxX6uef0DTzK7qie94y7kZfreE7ISZyHV+jVUUmu2SB9O6j7dX0ujQCJnNBA2m+eiUVXyRhJ62XGyPJHVy4IBfVYKh1Nj3o9oFxmjBO7s/JBAyneRwquFGuJMjkq809X3oKXz3dcvJBuZ6oWgCYzRm91vcglHtaZo7fy07VKjOWmXgrE3errnqg6DnFzTw2LBa9gD3G7gGkONhN7DZxkAKrPAyc1Yd51bHIsKboUy294YdFZkM4d40PXdaI3FwWwVIlPXPxUZfre5Bp5iubOJZVKH0oaSHGCREpl+G1u9D7ngFdOtyuVuRMPiCOmgQ4lPVc5orbxZE6zTxBC85yzs1w0TqxYovYRejxTR3fGWPePBwQasIs/4zY1VdhwTz8uFiYP6rEU+TV1f/AOPRp/8AzYQ92KxTfR0IqDCiLND9j+IHVwuB734nGOHkxrV2WF2Pxg27sBCPayBFxJ8PjMQj0QYKw2HfEcGMY57jk1oLie4C5XZjm89l8REh4YWtFdOJf+xYHRAf7zQOK2D5P2VQi2UfG4mIzIwoRZhoDh2GFCAt4r0fIPNDA4QjoMJCYRPfpqif7j5u7NUGDua2zvER5HD4R1P4zjx0cMcYeFEy43sXF7TLILK3NzZrhoLxFxLnYzFCQESMB0cORmBCg9VrRpnLSS9xEMur71S0Snr9KoDczvNSj2tM1Ye91tMtFxqM5aZeCDk415aIHy3fDzSJu9X3qhoImc0HFopuULKt5GGrre5HOIMhkgpdVYd6B9NijwG3bn5qsaDc5oODWU3Poq9tVx3XUY6qxyVe6mwQUvmKRmjDTY69iOZITGaMFVyggZI1aZ8UfvZadqB0zTokTdy1QWu1OuSjd3PXsVpEqtc1Gb2eiAWXq0z4quNWWnauJdenTJcninLVAD5CnX3qNbTc+irWzFRz9yjDVYoDmVXCrnVWHqo91JkMlXtpuEBrqbH0Uaym59FWNquVGPqMjkgPbVceqpfMU6+5R5psFXMkKhmgMNOevYpRerTPiqwVZ6KB16dMkB+/lp2q12p1y4I/dy1VotVrmg4sFOevYhZM1aZ+SM3s9ELpGnRBXmqw9Ua+kUnNHim4VayYmc0HFrabnusjmVXHqjHVWKPdTYIP/9k="
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View style={styles.buttonManage}>
                <Button
                  title="Submit"
                  onPress={() => editProfile()}
                  color="#BE3030"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "8%"
  },
  imageProfile: {
    width: 130,
    height: 130,
    borderRadius: 99,
    justifyContent: "center",
    marginBottom: 10
  },
  buttonManage: {
    borderRadius: 6,
    marginTop: 20,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
    width: 150
  },
  inputLogin: {
    borderBottomColor: "#0b8457",
    borderBottomWidth: 2,
    marginBottom: 30,
    fontFamily: 'ProximaNova-Regular'
  },
  textInput: {
    color: "#0b8457",
    marginBottom: 5,
    marginTop: 20,
    marginRight: "auto",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: 'ProximaNova-Regular'
  },
  textTitleAcc: {
    fontSize: 20,
    margin: 10,
    backgroundColor: "#0b8457",
    color: "white",
    paddingBottom: 7,
    borderRadius: 10,
    textAlign: "center",
    fontFamily: 'ProximaNova-Regular'
  },
  AccDetailType: {
    borderColor: "#0b8457",
    borderWidth: 1,
    padding: 5,
    width: 80,
    fontFamily: 'ProximaNova-Regular',
    width: '40%'
  },
  AccDetailNumber: {
    borderColor: "#0b8457",
    borderWidth: 1,
    padding: 5,
    width: 150,
    textAlign: "center",
    flexDirection: "row",
    fontFamily: 'ProximaNova-Regular',
    width: '50%'
  },
  textChangeImage: {
    borderColor: "#0b8457",
    borderWidth: 1,
    padding: 5,
    margin: 20
  }
});
