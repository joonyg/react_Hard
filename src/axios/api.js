import axios from 'axios'

const apiUrl = 'https://moneyfulpublicpolicy.co.kr'
const api = axios.create({
  baseURL: apiUrl,
})

api.interceptors.request.use(
  config => {
    console.log('인터셉터 요청 성공')
    return config
  },
  error => {
    console.log('인터셉터 요청 오류')
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    console.log('인터셉터 응답 받음')
    return response.data
  },
  error => {
    console.log('인터셉터 응답 오류', error)

    if (error.response) {
      console.log('서버 응답 데이터:', error.response.data)
      console.log('상태 코드:', error.response.status)
    } else if (error.request) {
      console.log('서버 응답이 없습니다.')
    } else {
      console.error('요청을 보내는 중 오류 발생:', error.message)
    }

    return Promise.reject(error)
  }
)

export default api
