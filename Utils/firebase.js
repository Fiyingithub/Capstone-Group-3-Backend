import admin from "firebase-admin";
import dotenv  from "dotenv";

dotenv.config()

const serviceAccount = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDR13SOqa8OIODt\nzEkVytDV0fqXP7mJvqdomxWsgoYOSHbmFLymy1rorrFbcCqJ5yjMgp+y+UNzJgvh\nvf7VpdtW77Kk2ekQAMEcN+L+DAiUtq+T3/pfkVtneDuOzDylsy1jD1gC1pGgfEpl\nq2t3e6VBg4UgvfDaDuxZ8x+TUdgAtMsluPNeBpknhvQjw8gteiAccFDIGLRUXnJs\nonu1MNhvY013KSyUZ/WoDiFimPQLiI8ZR4kxQ7gPean0JJwhTBtjSdnKHpC1gnYe\nraaeXnov5y4jETLg104XyUQluYDB+IGMMd88ogRHU/ZyUkxVejyJqHowKtzIR3St\nyqk190SdAgMBAAECggEABEavNd8IVbHe04m3rY2B/vF1+VIPnlp3v951LRxFzhG0\n9pBSndWEBzzUGWhqPYAr6Sr6RSPmN3j9gf6krEbidt2QluJn6O8TAFe1NPcaz6j/\nX/SO/haQtcWR9SF9VOUXVi7wXLJxqkMOIw9As+Edp32eH2Ivf8oRD+4v5QkkbTM4\nf3jCC2TdLNK0ux7ziRHFV1MWGmBnwJoEpUPkej8iEfepXLEIes0zGMknxePAYvsC\nsFOxtItXGalDlUpvC6OtOWL7xbcBQueFfmrGkSUemnC0v+xPnX5cKbjRzL568p6H\nOHOc/d/2WKFaHfDgRD1TnPVi9esI+nbEkTB4uxzVAwKBgQD26q9NqJITPFJWIGI8\nflYpXGOJc0WB2IRhvFgAsIVYEVNh/JpPsnqjOgs3iXiONwyQIFjbHaydjPWf33mo\nn8IlgKcD0EqTynx8G9dZuXPPNYZF6nfxmgq5+ZQmavlSCRNUAlcl0gHunmOmYEQ5\n7PksdnVJMo6clIfPS+qEy8g+PwKBgQDZj559hVvgvkcCTKq9nXJJKHAu2andFdJZ\nquqW+mS1KIljHtruKoroz+p2QFia+qZsK4+AHxU09mrhn7wK+U04rTYFqxY4jPIo\nBzG9JJ4KbW2eNF6v0ot4Zz6BNCG3FuxNEzsnizigVCylsvqTZHX5HRJtmgdsrI+f\nQaoZ85y+IwKBgDirGfqnwoa5pGfx3LnngNzTQGDuXLh1OcS4ljXqTWAt8cYeVEgQ\nPUcy7hob6dgx2CdH1TzMra4nCMRdZK2HpOY4hZxBdKxAn5tYRG9qOaMHtL5dFpQT\nd3zBQ/ghOwFR5ea09s1OSnU6UsJ/e4kT0wgaU8at3L8g855m3PcHUfi/AoGAPLM6\naBEGMm1ESJr1ZFQCZ/D1Y8zs/Lcy6juqmhcgc/7sXhBkyuBpw00HQJjxX8QhHLsG\nnZuOgiliZrL3dyRZbD+/e9NhLsP8aDihowENayFe3S4FYQ7gROahZNETuw6VPWfp\nMD5CvVDe6BhIm0kDNU7sLlI0UhjPNYLPn8/9YnsCgYEAjPnUXK3KUzWuBZl++COZ\nRED5/7iGEzI//1wsNm8DmISTc6TNNO36Ni5aB0DU9cRFeRilQoP1R9YL+PWxZmDS\n6MiZY3Q2Y/8iKCr734yVm1q31bOOkwo7CEnU+g2ehsZdP+rwlVnCcvzCsMyFhETC\nz7zXjLiq9ZCoG6HPiZfmBiw=\n-----END PRIVATE KEY-----\n",
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_URI,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL,
  "universe_domain": process.env.FIREBASE_UNIVERSE_DOMIAN
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
