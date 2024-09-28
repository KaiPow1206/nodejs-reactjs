import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import ReactFacebookLogin from  'react-facebook-login';


const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input className="form-control" id="pass" />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary"
          onClick={() => {
            let email= document.getElementById("email").value;
            let pass_word=document.getElementById("pass").value;
            console.log(email,pass_word);
            loginAPI({
              email,
              pass_word,
            })
            .then((result) => {
              // result gồm message và data (access token)
              //tạo pop up thanh báo thành công
              toast.success(result.message);
              // lưu access token trong local storage của browser
              localStorage.setItem("LOGIN USER",result.data)
              //chuyển hướng sang trang chủ khi thành công
              navigate("/");
            })
            .catch((params) => {
              console.log("error API");
              toast.error("Something Wrong");
            })
          }
          }
          >Login</button>
          <ReactFacebookLogin 
            appId="3771455953110034"
            fields="name,email,picture"
            callback={()=> {
            }}
          />
        </div>
      </form>
    </div>
  </div>
};

export default Login;