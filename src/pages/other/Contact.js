import { Fragment, useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map"
import tick from "../../assets/qa.gif";
import cogoToast from 'cogo-toast';


const Contact = () => {
  let { pathname } = useLocation();
  const [ email , setEmail ] = useState("")
  const [ message , setMessage ] = useState("")
  const [ buttonText , setButtonText ] = useState( "SEND" )
  const [ emailCheck , setEmailCheck ] = useState(true);
  const [ messageheck , setMessageCheck ] = useState(true);
  const [ buttonDisabled , setButtonDisabled ] = useState(false)

  const errorMessageStyle = {
    color: 'red',
  };

  const handleEmailInput = (val)=>{
    setEmail(val);
    setEmailCheck(true);
  }
  const handleMessageInput = (val)=>{
    setMessage(val);
    setMessageCheck(true);
  }

  const sendMessage = ( )=>{

      if(!email){ setEmailCheck(false) }
      else if(!message){ setMessageCheck(false) }
      else{
        setMessageCheck(true)
        setEmailCheck(true)
        setButtonDisabled(true)
        setButtonText("SENDING")
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            "from": email,
            "message": message
        });
  
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
  
        fetch("https://apis.rubypets.co.uk/user/queries/add", requestOptions)
        .then(response => response.json())
        .then(result =>
           {
            setButtonDisabled(false);
            setButtonText("SEND")
            if(result.success){
              setEmail("");
              setMessage("")
              cogoToast.success("Message Sent", {position: "top-right"});  
            }
            else{
              cogoToast.error("Message Not Sent", {position: "top-right"});
            }
           })
        .catch(error => console.log('error', error));
  
      }
  }



  return (

    <Fragment>
      <SEO
        titleTemplate="Contact"
        description="Contact page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Contact", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">


            <div className="custom-row-2">
              <div className="col-12 col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+012 345 678 102</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:admin@rubypets.co.uk">
                        admin@rubypets.co.uk
                        </a>
                      </p>
                      <p>
                        <a href="https://rubypets.co.uk/">
                        Ruby Pets
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>street, Crossroad 123.</p>
                    </div>
                  </div>


                </div>
              </div>
              <div className="col-12 col-lg-8 col-md-7">
                <div  className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <div className="contact-form-style">
                    <div className="row">
                      

                      <div className="col-lg-6">
                        <p style={errorMessageStyle} hidden={emailCheck} >email* required</p>
                        <input id="email" onChange={(e)=>{handleEmailInput(e.target.value)}} name="email" required placeholder="Email*" type="email" value={email} />
                      </div>

                      
                      <div className="col-lg-12">
                        <p style={errorMessageStyle} hidden={messageheck} >message* required</p>
                        <textarea
                          required
                          value={message}
                          onChange={(e)=>{handleMessageInput(e.target.value)}}
                          id="message"
                          name="message"
                          placeholder="Your Message*"
                          defaultValue={""}
                        />
                        <button onClick={sendMessage} className="submit" disabled={buttonDisabled} >
                          {buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="form-message" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </LayoutOne>

    </Fragment>
  );
};

export default Contact;
