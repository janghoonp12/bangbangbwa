import React from "react";
import styled from "styled-components";
import users from "../../userData.json";

const SH3 = styled.h3`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;


function AdminBroker(props) {
    const text = props.text
    let filterdUser = users.filter((user) => {
      const arr = [user.email, user.nickname]
      let have = false
      arr.forEach((i) => {
        if (user.level === "1" && i.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
          have = true
        }
      })
      return have ? user : null;
    })
  
    return (
      <div>
        <SH3>중개사 관리</SH3>
        {filterdUser.map((data, index) => {
                return (
                  <p key={data.id} style={{textAlign: 'center'}}>
                    Email : {data.email} | Nickname : {data.nickname}
                  </p>
                );
            })}
      </div>
    )
  }

export default AdminBroker;