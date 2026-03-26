import "../Styles/Login.css";

function Login(){
    return(
    <div className="login-page">
        <div className="login-card">
            <h1>Welcome Back</h1>
            <p className="login-subtitle">Please enter your details to sign in.</p>
            <form className="login-form">
                <div className="input-group">
                    <label>Username</label>
                    <input type="text" placeholder="Enter your username" />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" />
                </div>
                <button type="submit" className="login-submit">Login</button>
            </form>
        </div>
    </div>
    );
}

export default Login;
