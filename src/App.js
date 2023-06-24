import './App.css';
import $ from 'jquery';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Story from './Story';
import searchImg from './search.png'
import profile from './profile.png'
import Tag from './Tag';
import { v4 as uuid } from 'uuid';
import Dropdown from 'react-dropdown';
import { logDOM } from '@testing-library/react';

function App() {

  const [stories, setStories] = useState([]);
  const [tags, setTags] = useState({
    countries: [],
    keywords: [],
    location: [],
    time: '7 days ago',
    sort_by: 'relevancy'
  })
  const tagInput = useRef();
  const searchInput = useRef();

  const baseQuery = {
    method: 'GET',
    url: 'https://gnews.io/api/v4/search',
    params: {lang: 'en', max: 1, apikey: '8ed1940461455a13a5b73d266c95afc0'}
  }
  const [query, setQuery] = useState(null);

  const dropdownOptions = {
    time: [
      {display: 'Last hour', val: '1 hour ago', val2: '1h'},
      {display: 'Today', val: '1 day ago', val2: '1d'},
      {display: 'This week', val: '7 days ago', val2: '7d'},
      {display: 'This month', val: '30 days ago', val2: '30d'}
    ],
    location: [
        {display: "Afghanistan", val: "AF"},
        {display: "Albania", val: "AL"},
        {display: "Algeria", val: "DZ"},
        {display: "Andorra", val: "AD"},
        {display: "Angola", val: "AO"},
        {display: "Antigua and Barbuda", val: "AG"},
        {display: "Argentina", val: "AR"},
        {display: "Armenia", val: "AM"},
        {display: "Australia", val: "AU"},
        {display: "Austria", val: "AT"},
        {display: "Azerbaijan", val: "AZ"},
        {display: "Bahamas", val: "BS"},
        {display: "Bahrain", val: "BH"},
        {display: "Bangladesh", val: "BD"},
        {display: "Barbados", val: "BB"},
        {display: "Belarus", val: "BY"},
        {display: "Belgium", val: "BE"},
        {display: "Belize", val: "BZ"},
        {display: "Benin", val: "BJ"},
        {display: "Bhutan", val: "BT"},
        {display: "Bolivia", val: "BO"},
        {display: "Bosnia and Herzegovina", val: "BA"},
        {display: "Botswana", val: "BW"},
        {display: "Brazil", val: "BR"},
        {display: "Brunei", val: "BN"},
        {display: "Bulgaria", val: "BG"},
        {display: "Burkina Faso", val: "BF"},
        {display: "Burundi", val: "BI"},
        {display: "Cabo Verde", val: "CV"},
        {display: "Cambodia", val: "KH"},
        {display: "Cameroon", val: "CM"},
        {display: "Canada", val: "CA"},
        {display: "Central African Republic", val: "CF"},
        {display: "Chad", val: "TD"},
        {display: "Chile", val: "CL"},
        {display: "China", val: "CN"},
        {display: "Colombia", val: "CO"},
        {display: "Comoros", val: "KM"},
        {display: "Congo", val: "CG"},
        {display: "Costa Rica", val: "CR"},
        {display: "Croatia", val: "HR"},
        {display: "Cuba", val: "CU"},
        {display: "Cyprus", val: "CY"},
        {display: "Czech Republic", val: "CZ"},
        {display: "Denmark", val: "DK"},
        {display: "Djibouti", val: "DJ"},
        {display: "Dominica", val: "DM"},
        {display: "Dominican Republic", val: "DO"},
        {display: "Ecuador", val: "EC"},
        {display: "Egypt", val: "EG"},
        {display: "El Salvador", val: "SV"},
        {display: "Equatorial Guinea", val: "GQ"},
        {display: "Eritrea", val: "ER"},
        {display: "Estonia", val: "EE"},
        {display: "Eswatini", val: "SZ"},
        {display: "Ethiopia", val: "ET"},
        {display: "Fiji", val: "FJ"},
        {display: "Finland", val: "FI"},
        {display: "France", val: "FR"},
        {display: "Gabon", val: "GA"},
        {display: "Gambia", val: "GM"},
        {display: "Georgia", val: "GE"},
        {display: "Germany", val: "DE"},
        {display: "Ghana", val: "GH"},
        {display: "Greece", val: "GR"},
        {display: "Grenada", val: "GD"},
        {display: "Guatemala", val: "GT"},
        {display: "Guinea", val: "GN"},
        {display: "Guinea-Bissau", val: "GW"},
        {display: "Guyana", val: "GY"},
        {display: "Haiti", val: "HT"},
        {display: "Honduras", val: "HN"},
        {display: "Hungary", val: "HU"},
        {display: "Iceland", val: "IS"},
        {display: "India", val: "IN"},
        {display: "Indonesia", val: "ID"},
        {display: "Iran", val: "IR"},
        {display: "Iraq", val: "IQ"},
        {display: "Ireland", val: "IE"},
        {display: "Israel", val: "IL"},
        {display: "Italy", val: "IT"},
        {display: "Jamaica", val: "JM"},
        {display: "Japan", val: "JP"},
        {display: "Jordan", val: "JO"},
        {display: "Kazakhstan", val: "KZ"},
        {display: "Kenya", val: "KE"},
        {display: "Kiribati", val: "KI"},
        {display: "Korea, North", val: "KP"},
        {display: "Korea, South", val: "KR"},
        {display: "Kuwait", val: "KW"},
        {display: "Kyrgyzstan", val: "KG"},
        {display: "Laos", val: "LA"},
        {display: "Latvia", val: "LV"},
        {display: "Lebanon", val: "LB"},
        {display: "Lesotho", val: "LS"},
        {display: "Liberia", val: "LR"},
        {display: "Libya", val: "LY"},
        {display: "Liechtenstein", val: "LI"},
        {display: "Lithuania", val: "LT"},
        {display: "Luxembourg", val: "LU"},
        {display: "Madagascar", val: "MG"},
        {display: "Malawi", val: "MW"},
        {display: "Malaysia", val: "MY"},
        {display: "Maldives", val: "MV"},
        {display: "Mali", val: "ML"},
        {display: "Malta", val: "MT"},
        {display: "Marshall Islands", val: "MH"},
        {display: "Mauritania", val: "MR"},
        {display: "Mauritius", val: "MU"},
        {display: "Mexico", val: "MX"},
        {display: "Micronesia", val: "FM"},
        {display: "Moldova", val: "MD"},
        {display: "Monaco", val: "MC"},
        {display: "Mongolia", val: "MN"},
        {display: "Montenegro", val: "ME"},
        {display: "Morocco", val: "MA"},
        {display: "Mozambique", val: "MZ"},
        {display: "Myanmar", val: "MM"},
        {display: "Namibia", val: "NA"},
        {display: "Nauru", val: "NR"},
        {display: "Nepal", val: "NP"},
        {display: "Netherlands", val: "NL"},
        {display: "New Zealand", val: "NZ"},
        {display: "Nicaragua", val: "NI"},
        {display: "Niger", val: "NE"},
        {display: "Nigeria", val: "NG"},
        {display: "North Macedonia", val: "MK"},
        {display: "Norway", val: "NO"},
        {display: "Oman", val: "OM"},
        {display: "Pakistan", val: "PK"},
        {display: "Palau", val: "PW"},
        {display: "Panama", val: "PA"},
        {display: "Papua New Guinea", val: "PG"},
        {display: "Paraguay", val: "PY"},
        {display: "Peru", val: "PE"},
        {display: "Philippines", val: "PH"},
        {display: "Poland", val: "PL"},
        {display: "Portugal", val: "PT"},
        {display: "Qatar", val: "QA"},
        {display: "Romania", val: "RO"},
        {display: "Russia", val: "RU"},
        {display: "Rwanda", val: "RW"},
        {display: "Saint Kitts and Nevis", val: "KN"},
        {display: "Saint Lucia", val: "LC"},
        {display: "Saint Vincent and the Grenadines", val: "VC"},
        {display: "Samoa", val: "WS"},
        {display: "San Marino", val: "SM"},
        {display: "Sao Tome and Principe", val: "ST"},
        {display: "Saudi Arabia", val: "SA"},
        {display: "Senegal", val: "SN"},
        {display: "Serbia", val: "RS"},
        {display: "Seychelles", val: "SC"},
        {display: "Sierra Leone", val: "SL"},
        {display: "Singapore", val: "SG"},
        {display: "Slovakia", val: "SK"},
        {display: "Slovenia", val: "SI"},
        {display: "Solomon Islands", val: "SB"},
        {display: "Somalia", val: "SO"},
        {display: "South Africa", val: "ZA"},
        {display: "South Sudan", val: "SS"},
        {display: "Spain", val: "ES"},
        {display: "Sri Lanka", val: "LK"},
        {display: "Sudan", val: "SD"},
        {display: "Suriname", val: "SR"},
        {display: "Sweden", val: "SE"},
        {display: "Switzerland", val: "CH"},
        {display: "Syria", val: "SY"},
        {display: "Taiwan", val: "TW"},
        {display: "Tajikistan", val: "TJ"},
        {display: "Tanzania", val: "TZ"},
        {display: "Thailand", val: "TH"},
        {display: "Timor-Leste", val: "TL"},
        {display: "Togo", val: "TG"},
        {display: "Tonga", val: "TO"},
        {display: "Trinidad and Tobago", val: "TT"},
        {display: "Tunisia", val: "TN"},
        {display: "Turkey", val: "TR"},
        {display: "Turkmenistan", val: "TM"},
        {display: "Tuvalu", val: "TV"},
        {display: "Uganda", val: "UG"},
        {display: "Ukraine", val: "UA"},
        {display: "United Arab Emirates", val: "AE"},
        {display: "United Kingdom", val: "GB"},
        {display: "United States", val: "US"},
        {display: "Uruguay", val: "UY"},
        {display: "Uzbekistan", val: "UZ"},
        {display: "Vanuatu", val: "VU"},
        {display: "Vatican City", val: "VA"},
        {display: "Venezuela", val: "VE"},
        {display: "Vietnam", val: "VN"},
        {display: "Yemen", val: "YE"},
        {display: "Zambia", val: "ZM"},
        {display: "Zimbabwe", val: "ZW"}
    ],
    sort_by: [
      {display: 'Relevance', val: 'relevance'},
      {display: 'Most Recent', val: 'publishedAt'}
      // {display: 'Source rank', val: 'rank'}
    ]
  }

  const [dropPos, setDropPos] = useState({
    time: 2,
    location: 0,
    sort_by: 0
  })

  useEffect(() => {
    $.getJSON('https://ipapi.co/json/', function(data) {
      setTags(p => ({
        ...p,
        countries: [data.country_code],
        keywords: [],
        location: [{val: data.region, id: uuid()}, {val: data.city, id: uuid()}]
      }))

      setDropPos(p => ({
        ...p,
        location: dropdownOptions['location'].map(loc => loc.val).indexOf(data.country_code)
      }))
    });
  }, [])

  // WHEN TAGS UPDATES, UPDATE THE QUERY //
  useEffect(() => {
    let tempSearch = {...baseQuery};

    if (tags.keywords.length + tags.location.length > 0) {
      let emptyKW = [];
      emptyKW = emptyKW.concat(tags.keywords.map(x => x.val));
      emptyKW = emptyKW.concat(tags.location.map(x => x.val));
      tempSearch.params.q = [...emptyKW].toString().replace(',', ' ');
      
      
      // tempSearch.params.sort_by = tags.sort_by;
      // tempSearch.params.from = tags.time;
      
      tempSearch.params.country = [...tags.countries][0].toLowerCase();
      // if (tags.countries.length > 0) {
      // }
      setQuery(tempSearch)
    }       
  }, [tags])

  // WHEN QUERY UPDATES, MAKE A REQUEST //
  useEffect(() => {
    if (!query) return;
    let storedArticles = JSON.parse(localStorage.getItem('keepArticles'));
    setStories(storedArticles);

    console.log(query);

    // axios.request(query).then((res) => {
    //   setStories(res.data.articles)
    // })

    let url = `${query.url}?q=${query.params.q.replace(' ', '')}&apikey=${query.params.apikey}`
    console.log(url);
    // fetch(url).then((res) => {
    //   return res.json()}).then((data) => {
    //     console.log(data);
    //     setStories(data.articles);
    //     localStorage.setItem('keepArticles', JSON.stringify(data.articles))
    //   })
  }, [query])

  function search() {
    let q = searchInput.current.value;
    searchInput.current.value = '';
    let temp = {...tags};
    temp.keywords = [{val: q, id: uuid()}];
    temp.location = [];
    setTags(temp);
  }

  function searchButton(e) {
    if (e.key === 'Enter') {
      search()
    }
  }
  
  function clickSearch() {
    search();
  }

  function openAddTag() {
    $('#tagInput').addClass('inputOpen');
    $('#addTag').addClass('openAdd')
    $('#tagInput').trigger('focus')
  }
  
  function closeAddTag() {
    $('#tagInput').removeClass('inputOpen');
    $('#addTag').removeClass('openAdd')
  }

  function addTag(e) {
    if (e.key === 'Enter') {
      let temp = [...tags.keywords];
      temp.push({val: tagInput.current.value, id: uuid()});
      setTags(p => ({
        ...p,
        keywords: temp
      }))
      closeAddTag()
      tagInput.current.value = '';
    }
  }
  
  function deleteTag(id) {
    let temp = [...tags.keywords];
    let i = temp.indexOf(temp.find(t => t.id===id));
    if (i >= 0) {
      temp.splice(i, 1);
      setTags(p => ({
        ...p,
        keywords: temp
      }))
    } else {
      temp = [...tags.countries]
      i = temp.indexOf(temp.find(t => t.id===id));
      if (i < 0) return;
      temp.splice(i, 1);
      setTags(p => ({
        ...p,
        countries: temp
      }))
    }
  }

  function dropdownChange(e) {
    let n = -1;
    Object.keys(dropdownOptions).forEach(key => {
      n = dropdownOptions[key].map(item => item.display).indexOf(e.value);
      if (n > -1) {
        let temp = {...dropPos};
        temp[key] = n;
        setDropPos(temp)
        if (key === 'location') {
          changeCountry(n);
        } else {
          let temp = {...tags}
          temp[key] = dropdownOptions[key][n].val;
          setTags(temp);
        }
        return;
      }
    })
  }

  function changeCountry(n) {
    let temp = {...tags};
    temp.countries = [dropdownOptions.location[n].val];
    temp.location = [];
    setTags(temp)
  }

  return (
    <div className="App">
      <div id="nav">
        <div id="navCont">
          <div id="menuButton">
            {/* <img src={profile} alt="profile button" /> */}
            <h4>Egg news</h4>
          </div>
          <div id="searchBar">
            <input id='searchInput' ref={searchInput} type="text" onKeyDown={searchButton} />
            <img src={searchImg} alt="search button" onClick={clickSearch}/>
          </div>
        </div>
      </div>
      <div id="storyCont">
        <div id="filters">
          <div id="tags">
            {tags.location.map(t => {
              return <Tag key={t.id} tag={t} delTag={deleteTag} />
            })}
            {tags.keywords.map(t => {
              return <Tag key={t.id} tag={t} delTag={deleteTag}/>
            })}
            <div className='addTag' id="addTag" onClick={openAddTag}>
              <input id='tagInput' ref={tagInput}  className='tagInput' type="text" onKeyDown={addTag} onBlur={closeAddTag} />
              <p>✛</p>
            </div>
          </div>

          <div id="tools">
            <Dropdown options={dropdownOptions['time'].map(x => x.display)} onChange={dropdownChange} value={dropdownOptions['time'][dropPos['time']].display} />
            <Dropdown options={dropdownOptions['location'].map(x => x.display)} onChange={dropdownChange} value={dropdownOptions['location'][dropPos['location']].display} />
            <Dropdown options={dropdownOptions['sort_by'].map(x => x.display)} onChange={dropdownChange} value={dropdownOptions['sort_by'][dropPos['sort_by']].display} />
          </div>

        </div>
        <div className="storyGrid">
          {stories.map(story => {
            return <Story key={story.id} story={story} />
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
