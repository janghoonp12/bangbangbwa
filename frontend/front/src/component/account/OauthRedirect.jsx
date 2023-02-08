import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { oauth2SignInAsync } from "../../reducers/userSlice";
import { useSearchParams } from 'react-router-dom'


function OauthRedirect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const { signInDone } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(oauth2SignInAsync(
      {
        userEmail: searchParams.get("email"),
        userNickname: searchParams.get("nickname"),
        accessToken: searchParams.get("accessToken"),
        refreshToken: searchParams.get("refreshToken"),
      })
    );
  }, []);

  useEffect(() => {
    if (signInDone) {
      setTimeout(() => {
        alert("로그인에 성공하였습니다.")
        navigate('/');
      }, 100);
    }
  });



  //dispatch(Oauth2RequestAction({ userEmail: searchParams.get("email"), userNickname: searchParams.get("nickname"), accessToken: searchParams.get("accessToken"), refreshToken: searchParams.get("refreshToken") }));



  return <></>;
}

export default OauthRedirect;