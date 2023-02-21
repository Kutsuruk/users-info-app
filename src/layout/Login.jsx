
const Login = () => {
    return(
        <>
            <h1 className='display-4'>Login</h1>
            <form action="post">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' />
                </div>
            </form>
        </>
    )
}

export default Login