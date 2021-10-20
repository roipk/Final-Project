import React, { useState } from 'react';
import $ from 'jquery';
import Select from 'react-select';
import Allcountries, {languagesAll} from "countries-list";
import Carousel,{Item} from 'react-elastic-carousel'


const countries = Object.entries(Allcountries.countries);
const languages = Object.entries(languagesAll);



function DisplayNames(language,type) {
    return new Intl.DisplayNames([language], { type: type });
}

function getLanguageList() {
    let selectLanguage=[]
    var languageNames  = DisplayNames(navigator.language.split('-')[0],'language');
    languages.map((language,index)=>{
        // console.log(country)
        if(languageNames.of(language[0])!==language[0])
        {
            selectLanguage.push( { value: language[0], label:languageNames.of(language[0])})
        }
    })
    return selectLanguage
}

function getCountriesList() {
    let selectCountries=[]
    const regionNames = DisplayNames(navigator.language.split('-')[0],'region');
    countries.map((country,index)=>{
        selectCountries.push( { value: country[1].name, label:regionNames.of(country[0])},)
    })
    return selectCountries
}

function getOpt(start,end=(new Date().getFullYear())) {
    var options =[]
    for(var year = end ; year >=start; year--){
        options.push({ value: year, label: year },)
    }
    return options
}

function getGenre() {
    var options =[
        { value: 'cla', label: 'Classical/Traditional' },
        { value: 'yid', label: 'Yiddish' },
        { value: 'ara', label: 'Arabic' },
        { value: 'lad', label: 'Ladino' },
        { value: 'pra', label: 'Prayer Songs (Piyutim)' },
        { value: 'mid', label: 'Middle Eastern music' },

      ]

    return options
}


export default function CreateOldMan(){
    const [language,setLanguage]= useState(null)
    let maxSelectLanguage = 2;
    const [genere,setGenere]= useState(null)
    let maxSelectGenere = 2;
    let item ={items: [
        {id: 1, title:  <div className="container-section-space">
                <div className="container-section">
                    <div className="wrap-input100 validate-input" data-validate="Name is required">

                        <span className="label-input100">User name*</span>

                        <input id='userName' className="input100" type="text" name='userName'
                               placeholder="Enter User Name" required/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Name is required">
                        <span className="label-input100">First name*</span>
                        <input id='firstName' className="input100" type="text" name='firstName'
                               placeholder="Enter First Name" required/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Name is required">
                        <span className="label-input100">Last name*</span>
                        <input id='lastName' className="input100" type="text" name='lastName'
                               placeholder="Enter Last Name" required/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="ID is required">
                        <span className="label-input100">ID*</span>
                        <input id='id' className="input100" type="text" name="id" placeholder="Enter ID" required/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="ID is required">
                        <span className="label-input100">Password*</span>
                        <input id='password' className="input100" type="text" name="password"
                               placeholder="Enter Password" required/>
                        <span className="focus-input100"></span>
                    </div>
                </div>
            </div>},
        {id: 2, title:  <div className="container-section-space">
                <div className="container-section">
                    <div className="wrap-input100 validate-input" data-validate="Nursing Home is required" required>
                        <span className="label-input100">Nursing Home*</span>
                        <input id='nursingHome' className="input100" type="text" name='nursingHome'
                               placeholder="Enter Nursing Home"/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Department is required">
                        <span className="label-input100">Department</span>
                        <input id='department' className="input100" type="text" name='department'
                               placeholder="Enter Department"/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Medical profile is required">
                        <span className="label-input100">Medical profile</span>
                        <input id='medicalProfile' className="input100" type="text" name='Medical profile'
                               placeholder="Enter Medical profile"/>
                        <span className="focus-input100"></span>
                    </div>
                </div>
            </div>},/*Nursing Home, Department, Medical profile*/
        {id: 3, title: <div className="container-section-space">
                <div className="container-section">
                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Year of birth</span>
                        <div>
                            <Select label="select year"
                                    onChange={e=>{}}
                                    style={{zIndex:100}}
                                    closeMenuOnSelect={true}
                                    defaultValue={{value:1949,label:1949}}
                                    options={getOpt(1925)}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                            />

                        </div>
                        {/*<span className="focus-input100"></span>*/}
                    </div>


                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Country where you were born</span>
                        <div>
                            <Select label="select year"
                                    onChange={e=>{}}
                                    style={{zIndex:100}}
                                    closeMenuOnSelect={true}
                                    options={getCountriesList()}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                            />

                        </div>
                        <span className="focus-input100"></span>
                    </div>


                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Country where you lived at ages 10-25</span>
                        <div>

                            <Select label="select year"
                                    onChange={e=>{}}
                                    style={{zIndex:100}}
                                    closeMenuOnSelect={true}
                                    options={getCountriesList()}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Language spoken since birth</span>
                        <div>
                            <Select label="select year"
                                    onChange={e=>{}}
                                    style={{zIndex:100}}
                                    closeMenuOnSelect={true}
                                    options={getLanguageList()}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Languages spoken at Youth (ages 10-25)</span>
                        <div>

                            <Select label="select year"
                                    style={{zIndex:100}}
                                    isMulti
                                    className="basic-multi-select"
                                    closeMenuOnSelect={true}
                                    options={(language &&language.length >= maxSelectLanguage) ?
                                        language : getLanguageList()}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                                    onChange={(e)=>{
                                        setLanguage(e)
                                    }}
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>


                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Year of immigration to Israel</span>
                        <div>
                            <Select label="select year"
                                    onChange={e=>{}}
                                    style={{zIndex:100}}
                                    closeMenuOnSelect={true}
                                    options={getOpt(1930)}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>

                </div>
            </div>},/*Year of birth, Country where you were born, Country where you lived at ages 10-25,Language spoken since birth,Languages spoken at Youth (ages 10-25),Year of immigration to Israel */
    {id: 4, title:  <div className="container-section-space">
            <div className="container-section">
                <div className="wrap-input100 input100-select">
                    <span className="label-input100">Genre 1</span>
                    <div>

                        <Select label="select year"
                            // onChange={e=>{}}
                                style={{zIndex:100}}
                                isMulti
                                className="basic-multi-select"
                                closeMenuOnSelect={true}
                                options={(genere &&genere.length >= maxSelectGenere) ?
                                    genere : getGenre()}//start, end-> today year
                                menuPlacement="auto"
                                menuPosition="fixed"
                                onChange={(e)=>{
                                    // console.log(e)
                                    setGenere(e)
                                }}
                        />

                    </div>
                    <span className="focus-input100"></span>
                </div>
            </div>
        </div>},/*Genre 1, Genre 2*/
    ]}
        return (
            <div>
                <Carousel itemsToShow={1} itemsToScroll={1}>
                    {item.items.map(item => <div key={item.id}>{item.title}</div>)}
                </Carousel>








            </div>
        );
    }


