import './styles/navbar.css'

export default function Nav() {
    return (
        <div class="navbar">
            <img src='favicon.ico' alt='logo' className='logo'/>
            <div class='selection'>
                <a href="/">Home</a>
                <a href="/byyear">Par année</a>
                <a href="/byenergy">Par énergie</a>
            </div>
            {/* <ion-icon size='large' name='information-circle-outline'/> */}
        </div>
  )
}