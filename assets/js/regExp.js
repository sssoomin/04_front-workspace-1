// 연습1. j로 시작하는 문자열인지 비교
let regExp = /^j/;
console.log(regExp.test('javascript'));
console.log(regExp.test('jQuery'));
console.log(regExp.test('html'));
console.log('---------');

// 연습2. j로 시작하고 t로 끝나는 문자열인지 비교
regExp = /^jt$/;  // 부정확함
console.log(regExp.test('javascript')); // false
console.log(regExp.test('jt'));         // true

regExp = /^j.+t$/;
console.log(regExp.test('javascript'));
console.log('---------');

// 연습3. @가 포함되어있는 문자열인지 비교 
regExp = /.*@.*/;
console.log(regExp.test('user01@naver.com'));
console.log(regExp.test('user01'));
console.log('---------');

// 연습4. g로 시작하고 d로 끝나는데 그 사이에 o 문자가 2글자 이상인지 비교
regExp = /^go{2,}d$/;
console.log(regExp.test('god'));    // false
console.log(regExp.test('good'));   // true
console.log(regExp.test('goood'));  // true
console.log('---------');

// 연습5. 시작부터 끝까지 숫자로만 이루어진 문자열인지 비교
regExp = /[0-9]+/;    // 부정확함
console.log(regExp.test('01238592안녕'));
regExp = /^[0-9]+$/;
console.log(regExp.test('01238592안녕'));
console.log(regExp.test('120398571'));
console.log('---------');

// 연습6. 시작부터 끝까지 영문자로만 이루어진 문자열인지 비교
regExp = /^[a-zA-Z]+$/;
console.log(regExp.test('HelloEveryOne'));  // true
console.log(regExp.test('Hi EveryOne~~'));  // false
console.log('---------');

// 연습7. 시작부터 끝까지 한글로만 이루어진 문자열인지 비교
regExp = /^[ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
console.log(regExp.test('안녕하세욬ㅋㅋㅋㅋ카ㅏㅏㅏㅏ'));
console.log(regExp.test('안녕하세요~~ㅎㅎ'));
console.log('---------');

// 연습8. 첫글자는 반드시 숫자이고 그 이후에는 숫자|영문자|밑줄로 이루어져있는지 비교
regExp = /^\d\w+$/;
console.log(regExp.test('1User_01'));
console.log(regExp.test('user_01'));
console.log(regExp.test('99user01!'));
console.log('---------');

// 연습9. 첫글자가 대소문자를 가리지 않고 j로 시작하는지 비교
//  regExp = /^[jJ]/;
regExp = /^j/i;
console.log(regExp.test('javascript'));
console.log(regExp.test('JavaScript'));

// 연습10. 여러 문장 중 j로 시작하는 부분을 찾아서 (***)로 치환
console.log('javascript\nJavaScript');

console.log('javascript\nJavaScript'.replace(regExp, '(***)'));
// 기본적으로 replace 경우 조건에 만족하는 첫번째 부분만 치환함

regExp = /^j/igm;
console.log('javascript\nJavaScript'.replace(regExp, '(***)'));

// -------------유효성 검사용 함수------------

// 우편번호 검사용 함수
const verifyPostCode = () => {
  // 숫자로만 5글자인지 비교할 패턴
  const regPostCode = /^[0-9]{5}$/;   // [0-9] 대신에 \d 작성가능
  const postCodeInput = document.getElementById('postcode');
  const resultEl = document.getElementById('postcode-result');

  if(regPostCode.test(postCodeInput.value)){
    resultEl.innerHTML = '우편번호 형식입니다.';
    resultEl.style.color = 'green';
  }else{
    resultEl.innerHTML = '우편번호 형식에 맞지 않습니다.';
    resultEl.style.color = 'red';
    postCodeInput.focus();
  }
}

// 휴대전화 검사용 함수
const verifyMobile = () => {
  // 010 으로 시작하고 -와 함께 매번 4자리수로 두 세트 작성되어있는지 비교할 패턴
  const regMobile = /^010(-[0-9]{4}){2}$/;
  const mobileInput = document.getElementById('mobile');
  const resultEl = document.getElementById('mobile-result');

  if(regMobile.test(mobileInput.value)){
    resultEl.innerHTML = '휴대전화 형식입니다.';
    resultEl.style.color = 'green';
  }else{
    resultEl.innerHTML = '휴대전화 형식에 맞지 않습니다.';
    resultEl.style.color = 'red';
    mobileInput.select();
  }
}

// 아이디 검사용 함수
const verifyUserId = () => {

  // 5~20자, 소문자/숫자/특수문자(-,_), 첫글자 소문자로 이뤄져있는지 비교할 패턴
  const regUserId = /^[a-z][a-z0-9-_]{4,19}$/;
  const userIdInput = document.getElementById('userId');
  const resultEl = document.getElementById('userId-result');

  if(regUserId.test(userIdInput.value)){
    resultEl.innerHTML = '아이디 형식입니다.';
    resultEl.style.color = 'green';
  }else{
    resultEl.innerHTML = '아이디 형식에 맞지않습니다.';
    resultEl.style.color = 'red';
    userIdInput.select();
  }

}

// 비밀번호 검사용 함수
const verifyUserPwd = () => {
  // 5~20자, 대문자/소문자/숫자/특수문자(공백은제외), 3가지이상 사용하고 있는지 비교할 패턴
  // const regUserPwd = /^[a-zA-Z0-9!@#$%^&*()]{5,20}$/;

  const userPwdInput = document.getElementById('userPwd');
  const userPwd = userPwdInput.value;
  const resultEl = document.getElementById('userPwd-result');

  // 저 중에 몇개를 쓰고있는지 카운팅해야됨 // true == 1로 간주
  let passCount = /[a-z]/.test(userPwd);      // 소문자가 쓰이고 있는지
  passCount += /[A-Z]/.test(userPwd);         // 대문자가 쓰이고 있는지
  passCount += /[0-9]/.test(userPwd);         // 숫자가 쓰이고 있는지
  passCount += /[^a-zA-Z0-9\s]/.test(userPwd);// 특수문자(영문,숫자,공백을 제외)가 쓰이고 있는지

  console.log(passCount);

  if(userPwd.length >= 5 && userPwd.length <= 20 && passCount >= 3){
    resultEl.innerHTML = '비밀번호 형식입니다.';
    resultEl.style.color = 'green';
  }else{
    resultEl.innerHTML = '비밀번호 형식이 아닙니다.';
    resultEl.style.color = 'red';
    userPwdInput.select();
  }

}

// ip 검사용 함수
const verifyIp = () => {

  // IP형식 : 0.0.0.0 ~ 255.255.255.255
  /*
    각 영역마다 한자리/두자리/세자리 일수 있음
    한자리 :   0 ~   9    => [0-9]
    두자리 :  10 ~  99    => [1-9][0-9]
    세자리 : 100 ~ 199    => 1[0-9][0-9]
             200 ~ 249    => 2[0-4][0-9]
             250 ~ 255    => 25[0-5]

    ([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.  => 총 3세트
    ([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])    => 마지막에
  */
  const regIp = /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
  const ipInput = document.getElementById('ip');
  const resultEl = document.getElementById('ip-result');

  if(regIp.test(ipInput.value)){
    resultEl.innerHTML = 'IP 형식입니다.';
    resultEl.style.color = 'green';
  }else{
    resultEl.innerHTML = 'IP 형식에 맞지 않습니다.';
    resultEl.style.color = 'red';
    ipInput.focus();
  }
}

// 이메일 검사용 함수
const verifyEmail = () => {
  // 이메일형식 : 아이디@호스트.도메인 / 아이디@호스트.도메인.도메인
  //              (호스트: 1글자이상 / 도메인: 2~6글자)
  const regEmail = /^[a-z][a-z0-9-_]{4,19}@[a-z0-9-]+(\.[a-z]{2,6}){1,2}$/;
  const emailInput = document.getElementById('email');
  const resultEl = document.getElementById('email-result');

  if(regEmail.test(emailInput.value)){
    resultEl.innerHTML = '이메일 형식입니다.';
    resultEl.style.color = 'green';
  }else{
    resultEl.innerHTML = '이메일 형식에 맞지 않습니다.';
    resultEl.style.color = 'red';
    emailInput.focus();
  }
}

// 각 버튼마다 이벤트 핸들러 연결 ------------
window.onload = function() { // 요소들이 다 만들어진 후에 바로 실행하는 함수
  document.getElementById('postcode-btn').addEventListener('click', verifyPostCode);
  document.getElementById('mobile-btn').addEventListener('click', verifyMobile);
  document.getElementById('userId-btn').onclick = verifyUserId;
  document.getElementById('userPwd-btn').addEventListener('click', verifyUserPwd);
  document.getElementById('ip-btn').addEventListener('click', verifyIp);
  document.getElementById('email-btn').addEventListener('click', verifyEmail);
}

