import React from 'react';
import useInput from './hooks/useInput';
import axios from './../utils/axios-config';

const Signup = () => {
  const uid = useInput('');
  const password = useInput('');
  const balance = useInput(2000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uid && password) {
      let url = '/users/signup';
      let data = await axios.post(url, data = {
        uid: uid.value, 
        password: password.value, 
        balance: balance.value,
      });
      console.log(data)
      if (data.status == 200) {
        alert('해당 아이디는 이미 존재합니다.');
      } else if (data.status == 201) {
        alert('회원 가입이 완료되었씁니다.');
        // $nuxt.$router.replace({ path: '/signin' })
      } else {
        console.log(data)
      }
    } else {
      alert('모든 항목 빠짐없이 입력해주세요.');
    }
  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul>
          <li>
            <label htmlFor="아이디">아이디</label>
            <input type="text" name="uid" {...uid} />
          </li>
          <li>
            <label htmlFor="패스워드">패스워드</label>
            <input type="password" name="password" {...password} />
          </li>
          <li>
            <label htmlFor="적립금">적립금</label>
            <input type="text" className="read_only" readOnly name="balance" {...balance} />
          </li>
        </ul>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;