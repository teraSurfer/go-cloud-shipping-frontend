
// prod urls
// const urls = {
//   vendorLogin: `https://vendorlogin.auth.us-east-1.amazoncognito.com/login?client_id=1g0ossufi2qq1b0j8dmo1v2qrg&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://cmpe282.terasurfer.com/vendor`,
//   customerLogin: `https://buyerlogin.auth.us-east-1.amazoncognito.com/login?client_id=76cqrmd3rlprbdkncunjgecbl8&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://cmpe282.terasurfer.com/buyer`
// };

const urls = {
  vendorLogin: `https://vendorlogin.auth.us-east-1.amazoncognito.com/login?client_id=7ohma3vpdlg9fi1bi6uq078g49&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:8080/vendor`,
  customerLogin: `https://buyerlogin.auth.us-east-1.amazoncognito.com/login?client_id=76cqrmd3rlprbdkncunjgecbl8&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:8080/buyer`
};

const VENDOR = 'vendor';
const CUSTOMER = 'customer';

export { urls, VENDOR, CUSTOMER };
