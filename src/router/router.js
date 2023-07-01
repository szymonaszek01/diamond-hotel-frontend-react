import {Routes, Route} from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/public/home.page";
import Authenticator from "../components/Autheticator";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public router */}
        <Route index element={<HomePage/>}/>

        {/* private router */}
        <Route element={<Authenticator/>}>
        </Route>
      </Route>
    </Routes>
  )
}

export default Router