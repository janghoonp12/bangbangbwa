import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { OAUTH2_SIGN_IN_REQUEST } from "../../reducers/user";
import { useSearchParams } from 'react-router-dom'


function OauthRedirect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const { oauth2SignInDone, me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: OAUTH2_SIGN_IN_REQUEST,
      data: {
        userEmail: searchParams.get("email"),
        userNickname: searchParams.get("nickname"),
        accessToken: searchParams.get("accessToken"),
        refreshToken: searchParams.get("refreshToken"),
      },
    });
  }, []);

  useEffect(() => {
    if (oauth2SignInDone) {
      navigate('/');
    }
  });



  //dispatch(Oauth2RequestAction({ userEmail: searchParams.get("email"), userNickname: searchParams.get("nickname"), accessToken: searchParams.get("accessToken"), refreshToken: searchParams.get("refreshToken") }));



  return <></>;
}

export default OauthRedirect;