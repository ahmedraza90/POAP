import './style.css';
// import oasisx from './images/oasisx.png'
import oasisxLogo from './images/Copy of OasisX-logo-03.png'
import logo from './images/LBF-elemets-03.png'
import { useState, useEffect } from 'react';

// import Select from 'react-select';
// import countriesInfo from 'countries-information';



function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('')
  const [HowManyPOAP, setHowManyPOAP] = useState('')
  const [describe, setDescribe] = useState('')
  const [useCase, setuseCase] = useState([]);


  // What best describes you?
  const [Other, setOther] = useState("")

  //What best describes your use case? (choose more than one)
  const [otherValue, setOtherValue] = useState("");
  const [isother, setIsOther] = useState("")
  const [checked, setChecked] = useState(true);

  // const [phone, setPhone] = useState('');
  // const [country, setcountry] = useState('');
  // const [code, setCode] = useState('');
  const [response, setResponse] = useState(" ")

  // const countries = useMemo(() => countriesInfo.getAllCountries(), [])

  // const selectCountry = value => {
  //   setcountry(value.name)
  // }
  // const selectCode = value => {
  //   const plus = `${value.countryCallingCodes[0]}`
  //   setCode(plus.replace(/\s+/g, '').slice(1))
  // }
  const InsertName = (e) => {
    setName(e.target.value);
  }
  const InsertEmail = (e) => {
    setEmail(e.target.value);
  }
  const InsertTwitter = (e) => {
    setTwitter(e.target.value);
  }
  const InsertDescribe = (e) => {
    setDescribe(e.target.value);
  }
  const InsertHowManyPOAP = (e) => {
    setHowManyPOAP(e.target.value);
  }
  useEffect(() => {
    console.log(useCase);
  }, [useCase]);
  const InsertUseCase = (event) => {
    const selectedOption = event.target.value;
    let newUseCase;
    if (useCase.includes(selectedOption)) {
      newUseCase = useCase.filter(  
        (option) => option !== selectedOption
        );
      console.log("unchecked",newUseCase)
      } else {
        console.log("selectedOption",selectedOption)
        newUseCase = [...useCase, selectedOption];
        console.log("newUseCase",newUseCase)
      }
      setuseCase(newUseCase);
  };
  const InsertOtherValue = (event) => {
    setOtherValue(event.target.value);

  };
  const InsertOther = (event) => {
    setOther(event.target.value);
  };
  const InsertIsOther = (e) => {
    setIsOther(e.target.checked ? "other" : "");
  };
  // const InsertPhone = (e) => {
  //   setPhone(e.target.value);
  // }
  const handleSubmit = async (e) => {
    setChecked(true);
    let x ;
    if (describe === 'other') {
      x = Other
    } else {
      x = describe
    }
    if(otherValue){
      useCase.push(otherValue)
    }
    if(useCase.length === 0){
      e.preventDefault()
      setChecked(false);
    }else{

      const obj = {
        name,
        email,
        twitter,
        describe: x,
        HowManyPOAP,
        useCase,
        // country,
        // phoneNumber: `${code}${phone}`
      }
      var config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      };
      e.preventDefault();
      fetch(`https://qr-code-api.oasisx.world/POAP`, config)
        .then(function (response) {
          // The API call was successful!
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        })
        .then(function (data) {
          setResponse(data.status)
  
        })
        .catch(function (err) {
          // There was an error
          console.log('Something went wrong.', err);
        });
      console.log(obj)
    }


  }
  return (
    <div>

      {/* CONTACT */}
      <section id="form " className="section-padding">
        <div className="container">
          {response === "Success"
            ?
            <center>
              <div className="row sec2" data-aos="fade-down" data-aos-delay="250">
                <h1 className="display-4 text-black fw-semibold"> Thank you for registering, A member of our team will contact you shortly.</h1>
              </div>
            </center>
            :
            response === "sold out"
              ?
              <center>
                <div className="row sec2" data-aos="fade-down" data-aos-delay="250">
                  <h1 className="display-4 text-black fw-semibold">The event has sold out, a limited number of tickets will be available at the door.</h1>
                </div>
              </center>
              :
              <div>
                <div className='row logos'>
                  <center>
                    <img src={oasisxLogo} alt="" width="31%" height="31%" />
                   
                  </center>
                </div>
                <div className="row">
                  <div className="col-12 text-center" data-aos="fade-down" data-aos-delay="150">
                    <div className="section-title">
                      <h1 className="display-4 fw-semibold title">POAP Request Form</h1>
                      <center>
                      <p className="text-black" style={{ fontSize : "20px"}}>Create POAPs for your events </p>
                        <p className="text-black" style={{ fontSize : "20px"}}>Please answer the below questions </p>
                      </center>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center" data-aos="fade-down" data-aos-delay="250">
                  <div className="col-lg-8">
                    <form onSubmit={(e) => { handleSubmit(e) }} className="row g-3 p-lg-5 p-4 bg-white theme-shadow">
                      <div className="form-group col-lg-12">
                        <input id="name" type="text" value={name} required className="form-control" placeholder="Name" onChange={(e) => { InsertName(e) }} />
                      </div>
                      <div className="form-group col-lg-12">
                      <p ></p>
                        <input id="email" type="email" value={email} className="form-control" placeholder="Email Address" onChange={(e) => { InsertEmail(e) }} />
                      </div>
                      <div className="form-group col-lg-12">
                      <p ></p>
                        <input id="twitter" type="text" value={twitter} className="form-control" placeholder="What's your Twitter? " onChange={(e) => { InsertTwitter(e) }} />
                      </div>
                      <div className="form-group col-lg-12">
                      <p ></p>
                        <p className="text-black question">What best describes you?</p>
                        <div required className="describeCss" >
                          <div >
                            <input required type="radio" value="Company" name='g' onChange={(e) => { InsertDescribe(e) }} />&ensp; Company

                          </div>
                          <div >
                            <input required type="radio" value="Artist" name='g' onChange={(e) => { InsertDescribe(e) }} />&ensp; Artist

                          </div>
                          <div >
                            <input required type="radio" value="Project Creator" name='g' onChange={(e) => { InsertDescribe(e) }} />&ensp; Project Creator

                          </div>
                          <div >
                            <input required type="radio" value="FreeLancer" name='g' onChange={(e) => { InsertDescribe(e) }} />&ensp; FreeLancer

                          </div >
                          <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap" }}>
                            <div >
                              <input
                              required
                                type="radio"
                                value="other"
                                name='g'
                                checked={describe === "other"}
                                onChange={(e) => { InsertDescribe(e) }}
                              /> &ensp;Other : &ensp;
                            </div>
                            <div>
                              {describe === "other" && (
                                <input required className="form-control" id="Other" type="text" value={Other} onChange={(e) => { InsertOther(e) }} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-lg-12">
                      <p ></p>
                        <p className="text-black question">How many POAPs do you need to generate? </p>
                        <input required id="HowManyPOAP" type="text" value={HowManyPOAP} className="form-control" placeholder="answer? " onChange={(e) => { InsertHowManyPOAP(e) }} />
                      </div>
                      <div className="form-group col-lg-12">
                      <p ></p>
                        <p className="text-black question">What best describes your use case? (choose more than one)* </p>
                        <div className='describeCss'>
                          <div>
                            <input
                              type="checkbox"
                              value="Company"
                              onChange={InsertUseCase}
                            />
                            &ensp; Company
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              value="Artist"
                              onChange={InsertUseCase}
                            />
                            &ensp; Artist
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              value="Project Creator"
                              checked={useCase.includes("Project Creator")}
                              onChange={InsertUseCase}
                            />
                            &ensp; Project Creator
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              value="FreeLancer"
                              checked={useCase.includes("FreeLancer")}
                              onChange={InsertUseCase}
                            />
                            &ensp; FreeLancer
                          </div>
                          <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap" }}>
                            <div>
                              <input
                                type="checkbox"
                                value="other"
                                checked={isother === "other"}
                                onChange={InsertIsOther}
                              />
                              &ensp; Other : &ensp;
                            </div>
                            <div>
                            {isother === "other" && (
                              <input required className="form-control" id="otherValue" type="text" value={otherValue} onChange={(e) => InsertOtherValue(e)} />
                            )}
                            </div>
                          </div>
                          {!checked && <p style={{ color: "red" }}>Please select at least one option</p>}
                        </div>
                      </div>
                      {/* <div className="form-group col-lg-12">
                    <Select options={countries} onChange={selectCountry} getOptionLabel={(option) => option.name} getOptionValue={(option) => option.name} placeholder="SelectCountry" />
                  </div> */}
                      {/* <div className="form-group col-lg-12 phone">
                    <div>
                      <Select options={countries} onChange={selectCode} getOptionLabel={(option) => option.countryCallingCodes} getOptionValue={(option) => option.countryCallingCodes} placeholder="Code" />
                    </div>
                    <div>
                      <input id="phoneNumber" type="text" value={phone} className="form-control number" placeholder="Phone Number" onChange={(e) => { InsertPhone(e) }} />
                    </div>
                  </div> */}

                      <div className="form-group col-lg-12 d-grid ">
                        <input className="btn btn-brand submit" type="submit" value="Submit" />
                      </div>
                    </form>
                    <div className="col-12 text-center" data-aos="fade-down" data-aos-delay={150}>
                    </div>
                  </div>
                </div>
              </div>
          }

          {response === "Fail"
            ?
            <center>
              <div className="row justify-content-center">
                <h1 className="registered">User with this Email or twitter Account has already been registered</h1>
              </div>
            </center>
            : null
          }


        </div>
        <center>
          <div className="logo">
            <img src={logo} alt="" width={215} height={215} />
          </div>
        </center>
      </section>
      {/* https://www.youtube.com/watch?v=Fa1uybpY2Fo */}
      {/* https://github.com/SA7MAN/Elixir */}

    </div>
  );
}

export default App;


// HowManyPOAP: "aa"
// ​
// describe: "Company"
// ​
// email: "34ahmed.raza@gmail.com"
// ​
// name: "ahmed"
// ​
// twitter: "aa"
// ​
// useCases: Array [ "aaa" ]
