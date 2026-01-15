import"./style-DXrsnO1k.js";const a=[{id:1,title:"Figma Design app",instructor:"Mark Jones",category:"Special",type:"featured",lessons:8,image:"https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400",content:["Introduction","Tools","Components","Prototyping"]},{id:2,title:"Java Script",category:"Free",type:"popular",class:"js",level:"Beginner",lessons:"3/4",content:["Variables","Functions","Arrays","Objects"]},{id:3,title:"Java",category:"Special",type:"popular",class:"java",level:"Medium",lessons:"3/4",content:["Syntax","OOP","Collections","Streams"]}];let c=JSON.parse(localStorage.getItem("completedLessons"))||{},i="";const v="1234";window.handleNum=function(t){i.length<4&&(i+=t,u(),l())};window.handleAction=function(){i.length<4?(i=i.slice(0,-1),u(),l()):i===v?(sessionStorage.setItem("unlocked","true"),document.getElementById("passcode-screen").style.display="none"):g()};window.filterCourses=function(t,e){if(e.classList.contains("active"))return;document.querySelectorAll(".category-chip").forEach(n=>n.classList.remove("active")),e.classList.add("active");const s=document.getElementById("popular-grid");if(!s)return;const o=t==="All"?a.filter(n=>n.type==="popular"):a.filter(n=>n.type==="popular"&&n.category===t);s.innerHTML=o.map(n=>`
        <div class="small-card ${n.class}" onclick="window.openCourse(${n.id})">
            <div class="top-row">
                <div class="lang-icon">${n.title.includes("Java Script")?"JS":"J"}</div>
                <div class="level">${n.level}</div>
            </div>
            <div>
                <div class="title">${n.title}</div>
                <div class="lessons">Lessons: ${n.lessons}</div>
            </div>
        </div>
    `).join("")};window.toggleSettings=function(t){const e=document.getElementById("settings-page");e&&(t?(e.style.display="flex",e.offsetHeight,e.classList.add("active")):(e.classList.remove("active"),setTimeout(()=>{e.classList.contains("active")||(e.style.display="none")},400)))};window.toggleThemePage=function(t){const e=document.getElementById("theme-page");if(e)if(t){e.style.display="flex",e.offsetHeight,e.classList.add("active");const s=localStorage.getItem("app-theme")||"dark-glass";y(s)}else e.classList.remove("active"),setTimeout(()=>{e.classList.contains("active")||(e.style.display="none")},400)};const m=[{primary:"#D7FF3D",onPrimary:"#FFFFFF",secondary:"#C1E1C1",onSecondary:"#FFFFFF",tertiary:"#B0BEC5",onTertiary:"#FFFFFF",container:"#121212",onContainer:"#FFFFFF"},{primary:"#2196F3",onPrimary:"#FFFFFF",secondary:"#BBDEFB",onSecondary:"#FFFFFF",tertiary:"#E3F2FD",onTertiary:"#FFFFFF",container:"#101824",onContainer:"#FFFFFF"},{primary:"#FFC107",onPrimary:"#FFFFFF",secondary:"#FFECB3",onSecondary:"#FFFFFF",tertiary:"#FFF8E1",onTertiary:"#FFFFFF",container:"#1A1610",onContainer:"#FFFFFF"},{primary:"#607D8B",onPrimary:"#FFFFFF",secondary:"#CFD8DC",onSecondary:"#FFFFFF",tertiary:"#ECEFF1",onTertiary:"#FFFFFF",container:"#1A1D1F",onContainer:"#FFFFFF"},{primary:"#6750A4",onPrimary:"#FFFFFF",secondary:"#EADDFF",onSecondary:"#FFFFFF",tertiary:"#FFD8E4",onTertiary:"#FFFFFF",container:"#140E1D",onContainer:"#FFFFFF"},{primary:"#7D5260",onPrimary:"#FFFFFF",secondary:"#FFD9E3",onSecondary:"#FFFFFF",tertiary:"#EADDFF",onTertiary:"#FFFFFF",container:"#1D1216",onContainer:"#FFFFFF"}];function f(){const t=m[Math.floor(Math.random()*m.length)],e=document.documentElement;e.style.setProperty("--m3-primary",t.primary),e.style.setProperty("--m3-on-primary",t.onPrimary),e.style.setProperty("--m3-secondary",t.secondary),e.style.setProperty("--m3-on-secondary",t.onSecondary),e.style.setProperty("--m3-tertiary",t.tertiary),e.style.setProperty("--m3-on-tertiary",t.onTertiary),e.style.setProperty("--m3-container",t.container),e.style.setProperty("--m3-on-container",t.onContainer)}window.setTheme=function(t){document.body.classList.remove("theme-aqua","theme-material3","theme-dark-glass"),t!=="dark-glass"&&document.body.classList.add(`theme-${t}`),t==="material3"&&f(),localStorage.setItem("app-theme",t),y(t),setTimeout(()=>window.toggleThemePage(!1),300)};function y(t){document.querySelectorAll("#theme-page .settings-item").forEach(s=>{const o=s.getAttribute("onclick");o&&o.includes(`'${t}'`)?s.classList.add("selected"):s.classList.remove("selected")})}document.addEventListener("DOMContentLoaded",()=>{const t=localStorage.getItem("app-theme")||"aqua";window.setTheme(t)});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".num-btn, .enter-btn").forEach(e=>{e.addEventListener("touchstart",function(s){this.classList.add("active-touch")},{passive:!0}),e.addEventListener("touchend",function(){this.classList.remove("active-touch")},{passive:!0}),e.addEventListener("touchcancel",function(){this.classList.remove("active-touch")},{passive:!0})})});function g(){const t=document.querySelectorAll(".dot"),e=document.querySelector(".passcode-display");e.classList.add("shaking"),t.forEach(s=>s.classList.add("error")),setTimeout(()=>{t.forEach(s=>s.classList.add("collapse")),setTimeout(()=>{i="",e.classList.remove("shaking"),t.forEach(s=>{s.classList.remove("error","collapse","active")}),l()},500)},400)}function l(){const t=document.getElementById("action-btn");t&&(i.length<4?t.innerHTML='<i class="fa-solid fa-delete-left"></i>':t.innerHTML='<i class="fa-solid fa-arrow-right-to-bracket"></i>')}function u(){document.querySelectorAll(".dot").forEach((e,s)=>{s<i.length?e.classList.add("active"):e.classList.remove("active")})}function h(){const t=sessionStorage.getItem("unlocked"),e=document.getElementById("passcode-screen");t==="true"&&e&&(e.style.display="none")}function L(){const t=document.getElementById("featured-course"),e=document.getElementById("popular-grid");if(t){const s=a.find(o=>o.type==="featured");t.innerHTML=`
            <div onclick="window.openCourse(${s.id})">
                <div class="card-content">
                    <span class="badge">Design course</span>
                    <h2>${s.title}</h2>
                    <p class="instructor">By ${s.instructor}</p>
                    <div class="action-row">
                        <div class="icon-circle"><i class="bi bi-bookmark"></i></div>
                        <div class="icon-circle"><i class="bi bi-heart"></i></div>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" class="img-overlay">
            </div>
        `}e&&(e.innerHTML=a.filter(s=>s.type==="popular").map(s=>`
            <div class="small-card ${s.class}" onclick="window.openCourse(${s.id})">
                <div class="top-row">
                    <div class="lang-icon">${s.title.includes("Java Script")?"JS":"J"}</div>
                    <div class="level">${s.level}</div>
                </div>
                <div>
                    <div class="title">${s.title}</div>
                    <div class="lessons">Lessons: ${s.lessons}</div>
                </div>
            </div>
        `).join(""))}window.openCourse=function(t){const e=a.find(r=>r.id===t),s=document.getElementById("course-modal"),o=document.getElementById("modal-body");if(!e||!s||!o)return;let n="";e.content.forEach((r,d)=>{const p=`${t}-${d}`,F=c[p];n+=`
            <div class="lesson-item">
                <span>${r}</span>
                <button class="complete-btn ${F?"done":""}" onclick="event.stopPropagation(); window.toggleLesson(${t}, ${d})">
                    ${F?"Done":"Complete"}
                </button>
            </div>
        `}),o.innerHTML=`
        <h2 style="margin-bottom: 16px;">${e.title}</h2>
        <div class="lesson-list">
            ${n}
        </div>
    `,s.style.display="block"};window.toggleLesson=function(t,e){const s=`${t}-${e}`;c[s]=!c[s],localStorage.setItem("completedLessons",JSON.stringify(c)),window.openCourse(t)};document.addEventListener("DOMContentLoaded",()=>{h(),L(),console.log("App rendered.");const t=document.querySelector(".close-modal");t&&(t.onclick=()=>{document.getElementById("course-modal").style.display="none"}),window.onclick=o=>{const n=document.getElementById("course-modal");o.target==n&&(n.style.display="none")};const e=document.querySelector(".search-input"),s=document.querySelector(".clear-search");e&&s&&(e.addEventListener("focus",()=>{document.body.classList.add("searching")}),e.addEventListener("blur",o=>{setTimeout(()=>{document.activeElement!==e&&document.body.classList.remove("searching")},100)}),e.addEventListener("input",()=>{e.value.length>0?s.style.visibility="visible":s.style.visibility="hidden"}),s.addEventListener("click",()=>{e.value="",s.style.visibility="hidden",e.focus()}))});
