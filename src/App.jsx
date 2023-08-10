import { Amplify } from "aws-amplify";
import "./App.css";
import { Authenticator,Image, View,useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import myImage from './assets/yelp.png'
import awsExports from "./aws-exports";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListRestaurants from "./pages/ListRestaurants";
import CreateRestaurant from "./pages/CreateRestaurant";
Amplify.configure(awsExports);

export default function App() {

  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View  textAlign="center" padding={tokens.space.large}>
          <Image
            alt="yelp logo"
            src={myImage}
            width="300px"
          />
        </View>
      );
    }
  }  
  return (
    <Authenticator components={components} >
      {({ signOut }) => (
        <main>
          <div>
            <BrowserRouter>
              <NavBar logOut = {signOut} />
              <div className="bg">
                <div className="image-div">

                </div>
              </div>

              <Routes>
                <Route exact path="/" element={<ListRestaurants />} />
                <Route path="/create" element={<CreateRestaurant/>} />
              </Routes>
            </BrowserRouter>

          </div>
        </main>
      )}
    </Authenticator>
  );
}
