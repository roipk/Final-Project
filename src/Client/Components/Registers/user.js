import React, { Component } from 'react';



export default class CreateUser extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        // user = props.location
    }

    async componentDidMount() {
    }


    render() {
        return(
            <div>
                <div className="container-section-space">
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
                </div>

                <div className="container-section-space">
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
                </div>


                <div className="container-section-space">
                    <div className="container-section">
                        <div className="wrap-input100 input100-select">
                            <span className="label-input100">Year of birth</span>
                            <div>

                                <select id="birthYear" className="selection-2" name="birthYear">
                                    <option>Select Year</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>
                                    <option value="2001">2001</option>
                                    <option value="2000">2000</option>
                                    <option value="1999">1999</option>
                                    <option value="1998">1998</option>
                                    <option value="1997">1997</option>
                                    <option value="1996">1996</option>
                                    <option value="1995">1995</option>
                                    <option value="1994">1994</option>
                                    <option value="1993">1993</option>
                                    <option value="1992">1992</option>
                                    <option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <option value="1989">1989</option>
                                    <option value="1988">1988</option>
                                    <option value="1987">1987</option>
                                    <option value="1986">1986</option>
                                    <option value="1985">1985</option>
                                    <option value="1984">1984</option>
                                    <option value="1983">1983</option>
                                    <option value="1982">1982</option>
                                    <option value="1981">1981</option>
                                    <option value="1980">1980</option>
                                    <option value="1979">1979</option>
                                    <option value="1978">1978</option>
                                    <option value="1977">1977</option>
                                    <option value="1976">1976</option>
                                    <option value="1975">1975</option>
                                    <option value="1974">1974</option>
                                    <option value="1973">1973</option>
                                    <option value="1972">1972</option>
                                    <option value="1971">1971</option>
                                    <option value="1970">1970</option>
                                    <option value="1969">1969</option>
                                    <option value="1968" selected="selected">1968</option>
                                    <option value="1967">1967</option>
                                    <option value="1966">1966</option>
                                    <option value="1965">1965</option>
                                    <option value="1964">1964</option>
                                    <option value="1963">1963</option>
                                    <option value="1962">1962</option>
                                    <option value="1961">1961</option>
                                    <option value="1960">1960</option>
                                    <option value="1959">1959</option>
                                    <option value="1958">1958</option>
                                    <option value="1957">1957</option>
                                    <option value="1956">1956</option>
                                    <option value="1955">1955</option>
                                    <option value="1954">1954</option>
                                    <option value="1953">1953</option>
                                    <option value="1952">1952</option>
                                    <option value="1951">1951</option>
                                    <option value="1950">1950</option>
                                    <option value="1949">1949</option>
                                    <option value="1948">1948</option>
                                    <option value="1947">1947</option>
                                    <option value="1946">1946</option>
                                    <option value="1945">1945</option>
                                    <option value="1944">1944</option>
                                    <option value="1943">1943</option>
                                    <option value="1942">1942</option>
                                    <option value="1941">1941</option>
                                    <option value="1940">1940</option>
                                    <option value="1939">1939</option>
                                    <option value="1938">1938</option>
                                    <option value="1937">1937</option>
                                    <option value="1936">1936</option>
                                    <option value="1935">1935</option>
                                    <option value="1934">1934</option>
                                    <option value="1933">1933</option>
                                    <option value="1932">1932</option>
                                    <option value="1931">1931</option>
                                    <option value="1930">1930</option>
                                    <option value="1929">1929</option>
                                    <option value="1928">1928</option>
                                    <option value="1927">1927</option>
                                    <option value="1926">1926</option>
                                    <option value="1925">1925</option>
                                </select>
                            </div>
                            <span className="focus-input100"></span>
                        </div>


                        <div className="wrap-input100 input100-select">
                            <span className="label-input100">Country where you were born</span>
                            <div>

                                <select id="countryOrigin" className="selection-2" name="countryOrigin">
                                    <option>Select Country</option>
                                    <option value="AQ">Antarctica</option>
                                    <option value="AR">Argentina</option>
                                    <option value="AU">Australia</option>
                                    <option value="AT">Austria</option>
                                    <option value="BB">Barbados</option>
                                    <option value="BE">Belgium</option>
                                    <option value="BA">Bosnia And Herzegovina</option>
                                    <option value="BR">Brazil</option>
                                    <option value="BG">Bulgaria</option>
                                    <option value="CM">Cameroon</option>
                                    <option value="CL">Chile</option>
                                    <option value="CN">China</option>
                                    <option value="CO">Colombia</option>
                                    <option value="CG">Congo</option>
                                    <option value="CD">Congo, Democratic Republic</option>
                                    <option value="HR">Croatia</option>
                                    <option value="CU">Cuba</option>
                                    <option value="CZ">Czech Republic</option>
                                    <option value="DK">Denmark</option>
                                    <option value="DO">Dominican Republic</option>
                                    <option value="EG">Egypt</option>
                                    <option value="EE">Estonia</option>
                                    <option value="FI">Finland</option>
                                    <option value="FR">France</option>
                                    <option value="GA">Gabon</option>
                                    <option value="DE">Germany</option>
                                    <option value="GR">Greece</option>
                                    <option value="GL">Greenland</option>
                                    <option value="GP">Guadeloupe</option>
                                    <option value="GT">Guatemala</option>
                                    <option value="GN">Guinea</option>
                                    <option value="HK">Hong Kong</option>
                                    <option value="HU">Hungary</option>
                                    <option value="IS">Iceland</option>
                                    <option value="IN">India</option>
                                    <option value="ID">Indonesia</option>
                                    <option value="IR">Iran, Islamic Republic Of</option>
                                    <option value="IQ">Iraq</option>
                                    <option value="IE">Ireland</option>
                                    <option value="IL">Israel</option>
                                    <option value="IT">Italy</option>
                                    <option value="JM">Jamaica</option>
                                    <option value="JP">Japan</option>
                                    <option value="KE">Kenya</option>
                                    <option value="KR">Korea</option>
                                    <option value="LV">Latvia</option>
                                    <option value="LB">Lebanon</option>
                                    <option value="LU">Luxembourg</option>
                                    <option value="MK">Macedonia</option>
                                    <option value="MY">Malaysia</option>
                                    <option value="MX">Mexico</option>
                                    <option value="MA">Morocco</option>
                                    <option value="NL">Netherlands</option>
                                    <option value="NZ">New Zealand</option>
                                    <option value="NG">Nigeria</option>
                                    <option value="NO">Norway</option>
                                    <option value="PE">Peru</option>
                                    <option value="PH">Philippines</option>
                                    <option value="PL">Poland</option>
                                    <option value="PT">Portugal</option>
                                    <option value="PR">Puerto Rico</option>
                                    <option value="RO">Romania</option>
                                    <option value="RU">Russian Federation</option>
                                    <option value="SN">Senegal</option>
                                    <option value="SC">Seychelles</option>
                                    <option value="SG">Singapore</option>
                                    <option value="SK">Slovakia</option>
                                    <option value="SI">Slovenia</option>
                                    <option value="SU">Soviet Union</option>
                                    <option value="ZA">South Africa</option>
                                    <option value="ES">Spain</option>
                                    <option value="SZ">Swaziland</option>
                                    <option value="SE">Sweden</option>
                                    <option value="CH">Switzerland</option>
                                    <option value="TW">Taiwan</option>
                                    <option value="TR">Turkey</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="US" selected="selected">United States</option>
                                    <option value="UM">United States Outlying Islands</option>
                                    <option value="UY">Uruguay</option>
                                    <option value="VE">Venezuela</option>
                                    <option value="ZW">Zimbabwe</option>
                                </select>
                            </div>
                            <span className="focus-input100"></span>
                        </div>


                        <div className="wrap-input100 input100-select">
                            <span className="label-input100">Country where you lived at ages 10-25</span>
                            <div>

                                <select id="countryAtTwenty" className="selection-2" name="countryAtTwenty">
                                    <option>Select Country</option>
                                    <option value="AQ">Antarctica</option>
                                    <option value="AR">Argentina</option>
                                    <option value="AU">Australia</option>
                                    <option value="AT">Austria</option>
                                    <option value="BB">Barbados</option>
                                    <option value="BE">Belgium</option>
                                    <option value="BA">Bosnia And Herzegovina</option>
                                    <option value="BR">Brazil</option>
                                    <option value="BG">Bulgaria</option>
                                    <option value="CM">Cameroon</option>
                                    <option value="CL">Chile</option>
                                    <option value="CN">China</option>
                                    <option value="CO">Colombia</option>
                                    <option value="CG">Congo</option>
                                    <option value="CD">Congo, Democratic Republic</option>
                                    <option value="HR">Croatia</option>
                                    <option value="CU">Cuba</option>
                                    <option value="CZ">Czech Republic</option>
                                    <option value="DK">Denmark</option>
                                    <option value="DO">Dominican Republic</option>
                                    <option value="EG">Egypt</option>
                                    <option value="EE">Estonia</option>
                                    <option value="FI">Finland</option>
                                    <option value="FR">France</option>
                                    <option value="GA">Gabon</option>
                                    <option value="DE">Germany</option>
                                    <option value="GR">Greece</option>
                                    <option value="GL">Greenland</option>
                                    <option value="GP">Guadeloupe</option>
                                    <option value="GT">Guatemala</option>
                                    <option value="GN">Guinea</option>
                                    <option value="HK">Hong Kong</option>
                                    <option value="HU">Hungary</option>
                                    <option value="IS">Iceland</option>
                                    <option value="IN">India</option>
                                    <option value="ID">Indonesia</option>
                                    <option value="IR">Iran, Islamic Republic Of</option>
                                    <option value="IQ">Iraq</option>
                                    <option value="IE">Ireland</option>
                                    <option value="IL">Israel</option>
                                    <option value="IT">Italy</option>
                                    <option value="JM">Jamaica</option>
                                    <option value="JP">Japan</option>
                                    <option value="KE">Kenya</option>
                                    <option value="KR">Korea</option>
                                    <option value="LV">Latvia</option>
                                    <option value="LB">Lebanon</option>
                                    <option value="LU">Luxembourg</option>
                                    <option value="MK">Macedonia</option>
                                    <option value="MY">Malaysia</option>
                                    <option value="MX">Mexico</option>
                                    <option value="MA">Morocco</option>
                                    <option value="NL">Netherlands</option>
                                    <option value="NZ">New Zealand</option>
                                    <option value="NG">Nigeria</option>
                                    <option value="NO">Norway</option>
                                    <option value="PE">Peru</option>
                                    <option value="PH">Philippines</option>
                                    <option value="PL">Poland</option>
                                    <option value="PT">Portugal</option>
                                    <option value="PR">Puerto Rico</option>
                                    <option value="RO">Romania</option>
                                    <option value="RU">Russian Federation</option>
                                    <option value="SN">Senegal</option>
                                    <option value="SC">Seychelles</option>
                                    <option value="SG">Singapore</option>
                                    <option value="SK">Slovakia</option>
                                    <option value="SI">Slovenia</option>
                                    <option value="SU">Soviet Union</option>
                                    <option value="ZA">South Africa</option>
                                    <option value="ES">Spain</option>
                                    <option value="SZ">Swaziland</option>
                                    <option value="SE">Sweden</option>
                                    <option value="CH">Switzerland</option>
                                    <option value="TW">Taiwan</option>
                                    <option value="TR">Turkey</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="US" selected="selected">United States</option>
                                    <option value="UM">United States Outlying Islands</option>
                                    <option value="UY">Uruguay</option>
                                    <option value="VE">Venezuela</option>
                                    <option value="ZW">Zimbabwe</option>
                                </select>
                            </div>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 input100-select">
                            <span className="label-input100">Language spoken since birth</span>
                            <div>

                                <select id="languageOrigin" className="selection-2" name="language1">
                                    <option>Select Language</option>
                                    <option value="arame">ArabicME</option>
                                    <option value="arana">ArabicNA</option>
                                    <option value="ast">Asturian</option>
                                    <option value="bos">Bosnian</option>
                                    <option value="bre">Breton</option>
                                    <option value="bul">Bulgarian</option>
                                    <option value="cat">Catalan; Valencian</option>
                                    <option value="ces">Czech</option>
                                    <option value="cym">Welsh</option>
                                    <option value="dan">Danish</option>
                                    <option value="deu">German</option>
                                    <option value="ell">Greek</option>
                                    <option value="eng" selected="selected">English</option>
                                    <option value="epo">Esperanto</option>
                                    <option value="est">Estonian</option>
                                    <option value="eus">Basque</option>
                                    <option value="fas">Persian</option>
                                    <option value="fil">Filipino</option>
                                    <option value="fin">Finnish</option>
                                    <option value="fra">French</option>
                                    <option value="gle">Irish</option>
                                    <option value="haw">Hawaiian</option>
                                    <option value="heb">Hebrew</option>
                                    <option value="hin">Hindi</option>
                                    <option value="hrv">Croatian</option>
                                    <option value="hun">Hungarian</option>
                                    <option value="hye">Armenian</option>
                                    <option value="ind">Indonesian</option>
                                    <option value="isl">Icelandic</option>
                                    <option value="ita">Italian</option>
                                    <option value="jpn">Japanese</option>
                                    <option value="kor">Korean</option>
                                    <option value="lat">Latin</option>
                                    <option value="lav">Latvian</option>
                                    <option value="lit">Lithuanian</option>
                                    <option value="mkd">Malayalam</option>
                                    <option value="mlg">Malagasy</option>
                                    <option value="msa">Malay</option>
                                    <option value="nap">Neapolitan</option>
                                    <option value="nld">Dutch</option>
                                    <option value="nor">Norwegian</option>
                                    <option value="oci">Occitan</option>
                                    <option value="pol">Polish</option>
                                    <option value="por">Portuguese</option>
                                    <option value="que">Quechua</option>
                                    <option value="roh">Romansh</option>
                                    <option value="ron">Romanian</option>
                                    <option value="rus">Russian</option>
                                    <option value="slk">Slovak</option>
                                    <option value="slv">Slovenian</option>
                                    <option value="sna">Shona</option>
                                    <option value="spa">Spanish</option>
                                    <option value="srp">Serbian</option>
                                    <option value="swa">Swahili</option>
                                    <option value="swe">Swedish</option>
                                    <option value="tam">Tamil</option>
                                    <option value="tur">Turkish</option>
                                    <option value="vie">Vietnamese</option>
                                    <option value="yid">Yiddish</option>

                                    <option value="zho">Chinese (Mandarin)</option>
                                    <option value="zul">Zulu</option>
                                </select>
                            </div>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 input100-select">
                            <span className="label-input100">Languages spoken at Youth (ages 10-25)</span>
                            <div>

                                <select id="firstLangAtTwenty" className="selection-2" name="language2">
                                    <option>Select Language</option>
                                    <option value="arame">ArabicME</option>
                                    <option value="arana">ArabicNA</option>
                                    <option value="ast">Asturian</option>
                                    <option value="bos">Bosnian</option>
                                    <option value="bre">Breton</option>
                                    <option value="bul">Bulgarian</option>
                                    <option value="cat">Catalan; Valencian</option>
                                    <option value="ces">Czech</option>
                                    <option value="cym">Welsh</option>
                                    <option value="dan">Danish</option>
                                    <option value="deu">German</option>
                                    <option value="ell">Greek</option>
                                    <option value="eng" selected="selected">English</option>
                                    <option value="epo">Esperanto</option>
                                    <option value="est">Estonian</option>
                                    <option value="eus">Basque</option>
                                    <option value="fas">Persian</option>
                                    <option value="fil">Filipino</option>
                                    <option value="fin">Finnish</option>
                                    <option value="fra">French</option>
                                    <option value="gle">Irish</option>
                                    <option value="haw">Hawaiian</option>
                                    <option value="heb">Hebrew</option>
                                    <option value="hin">Hindi</option>
                                    <option value="hrv">Croatian</option>
                                    <option value="hun">Hungarian</option>
                                    <option value="hye">Armenian</option>
                                    <option value="ind">Indonesian</option>
                                    <option value="isl">Icelandic</option>
                                    <option value="ita">Italian</option>
                                    <option value="jpn">Japanese</option>
                                    <option value="kor">Korean</option>
                                    <option value="lat">Latin</option>
                                    <option value="lav">Latvian</option>
                                    <option value="lit">Lithuanian</option>
                                    <option value="mkd">Malayalam</option>
                                    <option value="mlg">Malagasy</option>
                                    <option value="msa">Malay</option>
                                    <option value="nap">Neapolitan</option>
                                    <option value="nld">Dutch</option>
                                    <option value="nor">Norwegian</option>
                                    <option value="oci">Occitan</option>
                                    <option value="pol">Polish</option>
                                    <option value="por">Portuguese</option>
                                    <option value="que">Quechua</option>
                                    <option value="roh">Romansh</option>
                                    <option value="ron">Romanian</option>
                                    <option value="rus">Russian</option>
                                    <option value="slk">Slovak</option>
                                    <option value="slv">Slovenian</option>
                                    <option value="sna">Shona</option>
                                    <option value="spa">Spanish</option>
                                    <option value="srp">Serbian</option>
                                    <option value="swa">Swahili</option>
                                    <option value="swe">Swedish</option>
                                    <option value="tam">Tamil</option>
                                    <option value="tur">Turkish</option>
                                    <option value="vie">Vietnamese</option>
                                    <option value="yid">Yiddish</option>
                                    <option value="zho">Chinese (Mandarin)</option>
                                    <option value="zul">Zulu</option>
                                </select>
                                &emsp;
                                <select id="secondLangAtTwenty" className="selection-2" name="language3">
                                    <option value="empty" selected="selected">Select Another Language (optional)
                                    </option>
                                    <option value="arame">ArabicME</option>
                                    <option value="arana">ArabicNA</option>
                                    <option value="ast">Asturian</option>
                                    <option value="bos">Bosnian</option>
                                    <option value="bre">Breton</option>
                                    <option value="bul">Bulgarian</option>
                                    <option value="cat">Catalan; Valencian</option>
                                    <option value="ces">Czech</option>
                                    <option value="cym">Welsh</option>
                                    <option value="dan">Danish</option>
                                    <option value="deu">German</option>
                                    <option value="ell">Greek</option>
                                    <option value="eng">English</option>
                                    <option value="epo">Esperanto</option>
                                    <option value="est">Estonian</option>
                                    <option value="eus">Basque</option>
                                    <option value="fas">Persian</option>
                                    <option value="fil">Filipino</option>
                                    <option value="fin">Finnish</option>
                                    <option value="fra">French</option>
                                    <option value="gle">Irish</option>
                                    <option value="haw">Hawaiian</option>
                                    <option value="heb">Hebrew</option>
                                    <option value="hin">Hindi</option>
                                    <option value="hrv">Croatian</option>
                                    <option value="hun">Hungarian</option>
                                    <option value="hye">Armenian</option>
                                    <option value="ind">Indonesian</option>
                                    <option value="isl">Icelandic</option>
                                    <option value="ita">Italian</option>
                                    <option value="jpn">Japanese</option>
                                    <option value="kor">Korean</option>
                                    <option value="lat">Latin</option>
                                    <option value="lav">Latvian</option>
                                    <option value="lit">Lithuanian</option>
                                    <option value="mkd">Malayalam</option>
                                    <option value="mlg">Malagasy</option>
                                    <option value="msa">Malay</option>
                                    <option value="nap">Neapolitan</option>
                                    <option value="nld">Dutch</option>
                                    <option value="nor">Norwegian</option>
                                    <option value="oci">Occitan</option>
                                    <option value="pol">Polish</option>
                                    <option value="por">Portuguese</option>
                                    <option value="que">Quechua</option>
                                    <option value="roh">Romansh</option>
                                    <option value="ron">Romanian</option>
                                    <option value="rus">Russian</option>
                                    <option value="slk">Slovak</option>
                                    <option value="slv">Slovenian</option>
                                    <option value="sna">Shona</option>
                                    <option value="spa">Spanish</option>
                                    <option value="srp">Serbian</option>
                                    <option value="swa">Swahili</option>
                                    <option value="swe">Swedish</option>
                                    <option value="tam">Tamil</option>
                                    <option value="tur">Turkish</option>
                                    <option value="vie">Vietnamese</option>
                                    <option value="yid">Yiddish</option>
                                    <option value="zho">Chinese (Mandarin)</option>
                                    <option value="zul">Zulu</option>
                                </select>
                            </div>
                            <span className="focus-input100"></span>
                        </div>



                        <div className="wrap-input100 input100-select">
                            <span className="label-input100">Year of immigration to Israel</span>
                            <div>

                                <select id="yearOfImmigration" className="selection-2" name="yearOfImmigration">
                                    <option>Select Year</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>
                                    <option value="2001">2001</option>
                                    <option value="2000">2000</option>
                                    <option value="1999">1999</option>
                                    <option value="1998">1998</option>
                                    <option value="1997">1997</option>
                                    <option value="1996">1996</option>
                                    <option value="1995">1995</option>
                                    <option value="1994">1994</option>
                                    <option value="1993">1993</option>
                                    <option value="1992">1992</option>
                                    <option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <option value="1989">1989</option>
                                    <option value="1988">1988</option>
                                    <option value="1987">1987</option>
                                    <option value="1986">1986</option>
                                    <option value="1985">1985</option>
                                    <option value="1984">1984</option>
                                    <option value="1983">1983</option>
                                    <option value="1982">1982</option>
                                    <option value="1981">1981</option>
                                    <option value="1980">1980</option>
                                    <option value="1979">1979</option>
                                    <option value="1978">1978</option>
                                    <option value="1977">1977</option>
                                    <option value="1976">1976</option>
                                    <option value="1975">1975</option>
                                    <option value="1974">1974</option>
                                    <option value="1973">1973</option>
                                    <option value="1972">1972</option>
                                    <option value="1971">1971</option>
                                    <option value="1970">1970</option>
                                    <option value="1969">1969</option>
                                    <option value="1968">1968</option>
                                    <option value="1967">1967</option>
                                    <option value="1966">1966</option>
                                    <option value="1965">1965</option>
                                    <option value="1964">1964</option>
                                    <option value="1963">1963</option>
                                    <option value="1962">1962</option>
                                    <option value="1961">1961</option>
                                    <option value="1960">1960</option>
                                    <option value="1959">1959</option>
                                    <option value="1958">1958</option>
                                    <option value="1957">1957</option>
                                    <option value="1956">1956</option>
                                    <option value="1955">1955</option>
                                    <option value="1954">1954</option>
                                    <option value="1953">1953</option>
                                    <option value="1952">1952</option>
                                    <option value="1951">1951</option>
                                    <option value="1950">1950</option>
                                    <option value="1949">1949</option>
                                    <option value="1948">1948</option>
                                    <option value="1947">1947</option>
                                    <option value="1946">1946</option>
                                    <option value="1945">1945</option>
                                    <option value="1944">1944</option>
                                    <option value="1943">1943</option>
                                    <option value="1942">1942</option>
                                    <option value="1941">1941</option>
                                    <option value="1940">1940</option>
                                    <option value="1939">1939</option>
                                    <option value="1938">1938</option>
                                    <option value="1937">1937</option>
                                    <option value="1936">1936</option>
                                    <option value="1935">1935</option>
                                    <option value="1934">1934</option>
                                    <option value="1933">1933</option>
                                    <option value="1932">1932</option>
                                    <option value="1931">1931</option>
                                    <option value="1930">1930</option>

                                </select>
                            </div>
                            <span className="focus-input100"></span>
                        </div>

                    </div>
                </div>


                <div className="container-section-space">
                    <div className="container-section">
                        <div className="wrap-input100 input100-select">
                            <span className="label-input100">Genre 1</span>
                            <div>

                                <select id="Genre1Select" className="selection-2" name="Genre1">
                                    <option>None</option>
                                    <option value="cla">Classical/Traditional</option>
                                    <option value="yid">Yiddish</option>
                                    <option value="ara">Arabic</option>
                                    <option value="lad">Ladino</option>
                                    <option value="pra">Prayer Songs (Piyutim)</option>
                                    <option value="mid">Middle Eastern music</option>
                                </select>
                            </div>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 input100-select">
                            <span className="label-input100">Genre 2</span>
                            <div>
                                <select id="Genre2Select" className="selection-2" name="Genre2">
                                    <option value="None">None</option>
                                    <option value="cla">Classical/Traditional</option>
                                    <option value="yid">Yiddish</option>
                                    <option value="ara">Arabic</option>
                                    <option value="lad">Ladino</option>
                                    <option value="pra">Prayer Songs (Piyutim)</option>
                                    <option value="mid">Middle Eastern music</option>
                                </select>
                            </div>
                            <span className="focus-input100"></span>
                        </div>


                    </div>
                </div>

            </div>
        );
    }
}
