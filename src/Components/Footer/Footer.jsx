import 'bootstrap'
import {Link} from 'react-router-dom'
import './Footer.css'
function Footer() {
  return (<>
  <div className="footer">
    <div className="footer-start mt-30px col-4">
     <h1>FitMe website</h1>
     <p>This web site allow you to buy different type of products we hope you will enjoy your trial with us</p>
    </div>
    <div className="footer-end col-8">
    <div className="sites">
    <h2>Social Links</h2>
              <div className="site-item"><Link to="https://twitter.com/" target='_blank'> twitter</Link></div>
              <div className="site-item"><Link to="https://www.facebook.com/" target='_blank'>facebook</Link></div>
              <div className="site-item"><Link to="https://www.linkedin.com/" target='_blank'>linkedin</Link></div>
              <div className="site-item"><Link to="https://www.instagram.com/" target='_blank'>instagram</Link></div>
             </div>
             <div className="footer-mid-end">
                <h2>Quick Links</h2>
                <ul>
                  <li><Link to={`/about`}>AboutUs</Link></li>
                  <li><Link to={`/products`}>Ourproducts</Link></li>
                  <li><Link to={`/categories`}>Our categories</Link></li>

                  <li><Link to={`/signin`}>Log in</Link></li></ul>
              </div>
    </div>
  </div>
  <div className='copy-right'>
    <div className="copy-right-start mt-30px col-4">
   
    </div>
    <div className="copy-right-end col-8">
      <p>  © Copyright 2024-2030 Protect FitMe Limited. All Rights Reserved.
124 City Road, Palestine, EC1V 2NX, Palestine. Company Registered in Palestine & Tulkarem No. 06359973
HMRC vat registration number 314 5995 07<br/>
<Link to={`/signin`}>Email: support@protectfitme.com</Link></p>
   
    </div>
  </div>
  </>);
}

export default Footer;
