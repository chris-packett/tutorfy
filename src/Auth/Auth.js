import auth0 from 'auth0-js';
import history from '../history'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'tutorfy.auth0.com',
    clientID: 'Mp7YgF7f85LLtwPPEOTnC4xdW3aKy9Mm',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://tutorfy.api',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
  
  userProfile;

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.createUser();
        history.replace('/dashboard');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }


  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  
  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  createUser = () => {
    if (!this.userProfile) {
      this.getProfile((err, profile) => {
        this.postUserToDatabase(profile)
          .then(userAndUserTypeData => {
            console.log(userAndUserTypeData)
          })
      })
    }
    else {
      console.log(this.userProfile)
    }
  }

  async postUserToDatabase (profile) {
    const API_URL = "https://localhost:5001/api"

    //Either a tutor or a student
    const userType = localStorage.getItem('user_type');
  
    let userInfo = {
      "Name": profile['https://tutorfy:auth0:com/full_name'] || profile.given_name,
      "ZipCode": profile['https://tutorfy:auth0:com/zip_code'] || "",
      "IsStudent": (userType === 'student'),
      "IsTutor": (userType === 'tutor')
    }
  
    let userOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Bearer " + this.getAccessToken()
      },
      body: JSON.stringify(userInfo)
    }
  
    let postedUserResponse = await fetch(`${API_URL}/users/add`, userOptions)

    let postedUserJSON = await postedUserResponse.json()

    let userTypeInfo;

    if (userType === 'student') {
      userTypeInfo = {
        "Name": profile['https://tutorfy:auth0:com/full_name'] || profile.given_name,
        "ZipCode": profile['https://tutorfy:auth0:com/zip_code'] || ""
      }
    }
    else if (userType === 'tutor') {
      userTypeInfo = {
        "Name": profile['https://tutorfy:auth0:com/full_name'] || profile.given_name,
        "ZipCode": profile['https://tutorfy:auth0:com/zip_code'] || "",
        "PictureURL": profile['picture']
      }  
    }

    let userTypeOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Bearer " + this.getAccessToken()
      },
      body: JSON.stringify(userTypeInfo)
    }

    let postedUserTypeResponse = await fetch(`${API_URL}/${userType}s/add`, userTypeOptions)

    let postedUserTypeJSON = await postedUserTypeResponse.json()

    return {
      user: postedUserJSON,
      userType: postedUserTypeJSON
    }
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No Access Token found');
    }
    return accessToken;
  }
}