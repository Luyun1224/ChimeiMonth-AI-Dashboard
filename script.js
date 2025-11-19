// ----- 資料來源 (N=61) -----
const finalDashboardData = {
    "totalCount": 61,
    "totalExternal": 20,
    "totalInternal": 41,
    "roleKpi": {
        "it": 3,
        "clinical": 24,
        "nonClinical": 34
    },
    "decisionMakerKpi": {
        "decisionMakers": 15, 
        "implementers": 46
    },
    "externalParticipantsList": [
        {"group": "第一組", "unit": "李俊杰診所"},
        {"group": "第一組", "unit": "德幼小兒科"},
        {"group": "第二組", "unit": "大林慈濟醫院院長室醫院發展組"},
        {"group": "第二組", "unit": "大林慈濟醫院放射腫瘤科 醫學物理中心"},
        {"group": "第三組", "unit": "高雄榮民總醫院教學研究部"},
        {"group": "第三組", "unit": "晉慶眼科診所"},
        {"group": "第三組", "unit": "歐洲工商管理學院"},
        {"group": "第四組", "unit": "中山大學精準醫學所"},
        {"group": "第四組", "unit": "中山大學精準醫學所"},
        {"group": "第四組", "unit": "黃清相診所"},
        {"group": "第五組", "unit": "高雄醫學大學醫學系"},
        {"group": "第五組", "unit": "高雄醫學大學醫學系"},
        {"group": "第五組", "unit": "正信診所"},
        {"group": "第六組(貓頭鷹)", "unit": "大林慈濟醫院教學部"},
        {"group": "第六組(貓頭鷹)", "unit": "三愛診所"},
        {"group": "第六組(貓頭鷹)", "unit": "國光生物科技股份有限公司"},
        {"group": "第七組(貓頭W鷹)", "unit": "成大醫院受試者保護中心"},
        {"group": "第七組(貓頭鷹)", "unit": "大林慈濟醫院教學部"},
        {"group": "第七組(貓頭鷹)", "unit": "寶建醫院護理部"},
        {"group": "第七組(貓頭鷹)", "unit": "樹德科技大學"}
    ],
    "groupRoleData": {
        "labels": ["第一組", "第二組", "第三組", "第四組", "第五組", "第六組(貓頭鷹)", "第七組(貓頭鷹)"],
        "it": [0, 1, 1, 0, 1, 0, 0],
        "clinical": [6, 4, 0, 4, 1, 4, 5],
        "nonClinical": [3, 4, 7, 4, 6, 5, 4]
    },
    "externalAnalysis": {
        "byType": {
            "醫院": 13,
            "學校": 6,
            "其他": 1
        },
        "byHospitalLevel": {
            "醫學中心": 5,
            "診所": 7,
            "地區醫院": 1
        }
    }
};

// ----- 地理編碼字典 -----
const externalLocations = {
    "奇美醫院": { lat: 23.021, lon: 120.241, name: "奇美醫院", city: "台南市", type: "internal", category: "醫院" },
    "中山大學": { lat: 22.6295, lon: 120.2662, name: "中山大學", city: "高雄市", type: "external", category: "學校" },
    "成大醫院": { lat: 22.9996, lon: 120.2223, name: "成大醫院", city: "台南市", type: "external", category: "醫院" },
    "大林慈濟醫院": { lat: 23.5935, lon: 120.4658, name: "大林慈濟醫院", city: "嘉義縣", type: "external", category: "醫院" },
    "高雄榮民總醫院": { lat: 22.6744, lon: 120.3233, name: "高雄榮民總醫院", city: "高雄市", type: "external", category: "醫院" },
    "寶建醫院": { lat: 22.6808, lon: 120.4850, name: "寶建醫院", city: "屏東縣", type: "external", category: "醫院" },
    "李俊杰診所": { lat: 22.9934, lon: 120.2127, name: "李俊杰診所", city: "台南市", type: "external", category: "診所" },
    "三愛診所": { lat: 23.0033, lon: 120.2163, name: "三愛診所", city: "台南市", type: "external", category: "診所" },
    "德幼小兒科": { lat: 23.0063, lon: 120.2114, name: "德幼小兒科", city: "台南市", type: "external", category: "診所" },
    "晉慶眼科診所": { lat: 23.0001, lon: 120.2130, name: "晉慶眼科診所", city: "台南市", type: "external", category: "診所" },
    "正信診所": { lat: 23.0232, lon: 120.2241, name: "正信診所", city: "台南市", type: "external", category: "診所" },
    "黃清相診所": { lat: 23.0253, lon: 120.2198, name: "黃清相診所", city: "台南市", type: "external", category: "診所" },
    "高雄醫學大學": { lat: 22.6465, lon: 120.3010, name: "高雄醫學大學", city: "高雄市", type: "external", category: "學校" },
    "國光生物科技": { lat: 24.2154, lon: 120.6022, name: "國光生物科技", city: "台中市", type: "external", category: "其他" },
    "樹德科技大學": { lat: 22.7091, lon: 120.3473, name: "樹德科技大學", city: "高雄市", type: "external", category: "學校" }
};

// ----- Chart.js 全域設定 -----
if (typeof Chart !== 'undefined' && typeof ChartDataLabels !== 'undefined') {
    Chart.defaults.font.family = "'Noto Sans TC', sans-serif";
    Chart.defaults.color = '#1f2937'; 
    Chart.defaults.plugins.legend.position = 'bottom';
    Chart.defaults.plugins.legend.labels.padding = 20;
    Chart.register(ChartDataLabels);
}


// ----- DOM 載入後執行 -----
document.addEventListener('DOMContentLoaded', async () => {

    // --- 0. 動態更新所有 KPI 數字 ---
    document.getElementById('kpi-total').textContent = finalDashboardData.totalCount;
    document.getElementById('kpi-external').textContent = finalDashboardData.totalExternal;
    document.getElementById('kpi-internal').textContent = finalDashboardData.totalInternal;

    // --- 1. 地理分佈圖 (依據 N=59 全體人員) ---
    if (typeof L !== 'undefined') {
        const map = L.map('map').setView([23.1, 120.3], 9); 
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        const internalIcon = L.divIcon({
            className: 'morandi-marker-icon-internal',
            iconSize: [20, 20]
        });
        const externalHospitalIcon = L.divIcon({
            className: 'morandi-marker-icon-external-hospital',
            iconSize: [20, 20]
        });
        const externalClinicIcon = L.divIcon({
            className: 'morandi-marker-icon-external-clinic',
            iconSize: [20, 20]
        });
        const externalOtherIcon = L.divIcon({
            className: 'morandi-marker-icon-external-other',
            iconSize: [20, 20]
        });

        const locationsToMark = {};
        const cityCounts = {}; 
        let mappedCount = 0;
        const totalParticipants = finalDashboardData.totalCount;
        const totalInternal = finalDashboardData.totalInternal;
        const locationKeys = Object.keys(externalLocations);

        function findLocationInfo(unitString) {
            for (const key of locationKeys) {
                if (unitString.includes(key)) {
                    return externalLocations[key];
                }
            }
            return null;
        }

        finalDashboardData.externalParticipantsList.forEach(person => {
            const locationInfo = findLocationInfo(person.unit);
            if (locationInfo) {
                mappedCount++; 
                const geoKey = `${locationInfo.lat},${locationInfo.lon}`;
                if (!locationsToMark[geoKey]) {
                    locationsToMark[geoKey] = { info: locationInfo, count: 0 };
                }
                locationsToMark[geoKey].count++;
                const city = locationInfo.city;
                if (city) {
                    if (!cityCounts[city]) cityCounts[city] = { internal: 0, external: 0 };
                    cityCounts[city].external++;
                }
            }
        });

        const chimeiLocation = externalLocations["奇美醫院"];
        const chimeiGeoKey = `${chimeiLocation.lat},${chimeiLocation.lon}`;
        if (!locationsToMark[chimeiGeoKey]) {
            locationsToMark[chimeiGeoKey] = { info: chimeiLocation, count: 0 };
        }
        locationsToMark[chimeiGeoKey].count += totalInternal;
        const chimeiCity = chimeiLocation.city;
        if (!cityCounts[chimeiCity]) cityCounts[chimeiCity] = { internal: 0, external: 0 };
        cityCounts[chimeiCity].internal += totalInternal;
        mappedCount += totalInternal;

        const subtitleEl = document.getElementById('map-subtitle');
        subtitleEl.textContent = `(來源: 全體人員, N=${totalParticipants}, 標記 ${mappedCount}/${totalParticipants} 人)`;

        const cityContainer = document.getElementById('city-counts-container');
        cityContainer.innerHTML = ''; 
        const sortedCities = Object.keys(cityCounts).sort((a, b) => {
            const totalA = (cityCounts[a].internal || 0) + (cityCounts[a].external || 0);
            const totalB = (cityCounts[b].internal || 0) + (cityCounts[b].external || 0);
            return totalB - totalA;
        }); 

        for (const city of sortedCities) {
            const counts = cityCounts[city]; 
            if (city === "台南市") {
                if (counts.internal > 0) {
                    const badge = document.createElement('span');
                    badge.className = 'data-badge';
                    badge.style.backgroundColor = '#003D82';
                    badge.style.color = '#ffffff';
                    badge.textContent = `台南市 (院內) ${counts.internal} 人`;
                    cityContainer.appendChild(badge);
                }
                if (counts.external > 0) {
                    const badge = document.createElement('span');
                    badge.className = 'data-badge';
                    badge.style.backgroundColor = '#FFA500';
                    badge.style.color = '#1f2937';
                    badge.textContent = `台南市 (院外) ${counts.external} 人`;
                    cityContainer.appendChild(badge);
                }
            } else {
                const total = (counts.internal || 0) + (counts.external || 0);
                if (total > 0) {
                    const badge = document.createElement('span');
                    badge.className = 'data-badge';
                    badge.style.backgroundColor = '#FFA500';
                    badge.style.color = '#1f2937';
                    badge.textContent = `${city} ${total} 人`;
                    cityContainer.appendChild(badge); 
                } 
            }
        } 

        Object.values(locationsToMark).forEach(loc => {
            const popupContent = `
                <div style="font-family: 'Noto Sans TC', sans-serif;">
                    <strong style="font-size: 1.1em;">${loc.info.name}</strong><br>
                    報名人數： ${loc.count} 人
                </div>
            `;
            let iconToUse;
            if (loc.info.type === 'internal') {
                iconToUse = internalIcon;
            } else if (loc.info.category === '醫院') {
                iconToUse = externalHospitalIcon;
            } else if (loc.info.category === '診所') {
                iconToUse = externalClinicIcon;
            } else {
                iconToUse = externalOtherIcon;
            }
            const tooltipContent = loc.info.name;
            L.marker([loc.info.lat, loc.info.lon], { icon: iconToUse })
                .addTo(map)
                .bindPopup(popupContent)
                .bindTooltip(tooltipContent, {
                    permanent: true,
                    direction: 'auto',
                    offset: [10, 0],
                    className: 'location-tooltip'
                });
        });
    }

    // --- 2. 從 list.html 自動推斷職類並繪製圖表 ---
    async function computeRolesFromList() {
        try {
            const resp = await fetch('list.html');
            const text = await resp.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            const groupCards = Array.from(doc.querySelectorAll('div.bg-white'));
            const labels = [];
            const itArr = [];
            const clinicalArr = [];
            const nonClinicalArr = [];

            // 擴充臨床關鍵字，包含常見臨床職稱與相關字眼
            const clinicalKeywords = ['醫師','主治','院長','住院醫師','護理師','護理長','醫檢師','臨床','營養師','治療師','物理治療師','呼吸治療','護理','主任','臨床醫檢師','主治醫師','主任醫師','護理', '護理長', '護理師', '助理研究員', '研究員'];

            function isClinical(title) {
                if (!title) return false;
                for (const kw of clinicalKeywords) {
                    if (title.indexOf(kw) !== -1) return true;
                }
                return false;
            }

            for (const card of groupCards) {
                const h2 = card.querySelector('.group-header h2');
                if (!h2) continue; // skip non-group cards
                const groupName = h2.textContent.trim();
                labels.push(groupName);

                let itCount = 0, clinicalCount = 0, nonClinicalCount = 0;
                const lis = Array.from(card.querySelectorAll('ul li'));
                for (const li of lis) {
                    const pTags = Array.from(li.querySelectorAll('p'));
                    const deptP = pTags.find(p => p.textContent.includes('部門:'));
                    const titleP = pTags.find(p => p.textContent.includes('職稱:'));
                    const dept = deptP ? deptP.textContent.replace('部門:', '').trim() : '';
                    const title = titleP ? titleP.textContent.replace('職稱:', '').trim() : '';

                    // 規則優先順序：
                    // 1) 若部門含有「病歷資訊」或「疾病分類」等字樣，視為非臨床（避免被誤判為資訊）
                    if (dept.indexOf('病歷資訊') !== -1 || dept.indexOf('疾病分類') !== -1) {
                        nonClinicalCount++;
                        continue;
                    }
                    // 2) 若部門包含「資訊室」則視為資訊背景
                    if (dept.indexOf('資訊室') !== -1) {
                        itCount++;
                        continue;
                    }
                    // 其餘若職稱包含臨床關鍵字視為臨床
                    if (isClinical(title)) {
                        clinicalCount++;
                        continue;
                    }
                    // 其餘視為非臨床
                    nonClinicalCount++;
                }

                itArr.push(itCount);
                clinicalArr.push(clinicalCount);
                nonClinicalArr.push(nonClinicalCount);
            }

            // compute totals
            const totalIt = itArr.reduce((a,b) => a+b, 0);
            const totalClinical = clinicalArr.reduce((a,b) => a+b, 0);
            const totalNonClinical = nonClinicalArr.reduce((a,b) => a+b, 0);

            // overwrite finalDashboardData
            finalDashboardData.groupRoleData = {
                labels: labels,
                it: itArr,
                clinical: clinicalArr,
                nonClinical: nonClinicalArr
            };
            finalDashboardData.roleKpi.it = totalIt;
            finalDashboardData.roleKpi.clinical = totalClinical;
            finalDashboardData.roleKpi.nonClinical = totalNonClinical;

            return {labels, itArr, clinicalArr, nonClinicalArr};
        } catch (err) {
            console.warn('無法自動解析 list.html，使用內建 finalDashboardData：', err);
            return null;
        }
    }

    // 在繪圖前先嘗試從 list.html 推斷職類分布（同步更新 finalDashboardData）
    await computeRolesFromList();

    // --- 2. 圖表繪製 ---
    if (typeof Chart !== 'undefined') {
    
        // (原有) 分組長條圖
        const ctxGroup = document.getElementById('groupChart').getContext('2d');
        new Chart(ctxGroup, {
            type: 'bar',
            data: {
                labels: finalDashboardData.groupRoleData.labels,
                datasets: [
                    {
                        label: '資訊',
                        data: finalDashboardData.groupRoleData.it,
                        backgroundColor: '#003D82', // 品牌藍
                    },
                    {
                        label: '臨床',
                        data: finalDashboardData.groupRoleData.clinical,
                        backgroundColor: '#FFA500', // 琥珀黃
                    },
                    {
                        label: '非臨床',
                        data: finalDashboardData.groupRoleData.nonClinical,
                        backgroundColor: '#6C5CE7', // 紫藍
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true }
                },
                plugins: {
                    datalabels: {
                        formatter: (value) => value > 0 ? value : '',
                        color: '#ffffff',
                        font: { weight: 'bold', size: 14 },
                        textStrokeColor: 'rgba(0,0,0,0.5)',
                        textStrokeWidth: 2
                    },
                    tooltip: {
                        callbacks: {
                            footer: function(tooltipItems) {
                                let sum = 0;
                                tooltipItems.forEach(function(tooltipItem) {
                                    sum += tooltipItem.parsed.y;
                                });
                                return '本組總計: ' + sum + ' 人';
                            }
                        }
                    }
                }
            }
        });

        // (原有) 全體人員背景分析 (圓環圖)
        const ctxCombined = document.getElementById('combinedAnalysisChart').getContext('2d');
        new Chart(ctxCombined, {
            type: 'doughnut',
            data: {
                labels: ['醫學中心 (院內)', '醫學中心 (院外)', '診所 (院外)', '地區醫院 (院外)', '學校 (院外)', '其他 (院外)'],
                datasets: [{
                    label: '背景分析',
                    data: [
                        finalDashboardData.totalInternal,
                        finalDashboardData.externalAnalysis.byHospitalLevel.醫學中心,
                        finalDashboardData.externalAnalysis.byHospitalLevel.診所,
                        finalDashboardData.externalAnalysis.byHospitalLevel.地區醫院,
                        finalDashboardData.externalAnalysis.byType.學校,
                        finalDashboardData.externalAnalysis.byType.其他
                    ],
                    backgroundColor: ['#003D82', '#FFA500', '#FFB84D', '#FFCC99', '#FFD9B3', '#FFE6CC'],
                    borderColor: '#FFFFFF',
                    borderWidth: 4,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        formatter: (value, ctx) => {
                            const total = ctx.chart.data.datasets[0].data.reduce((acc, data) => acc + data, 0);
                            const percentage = ((value / total) * 100).toFixed(1) + '%';
                            return percentage;
                        },
                        color: (context) => {
                            const bgColor = context.dataset.backgroundColor[context.dataIndex];
                            return (bgColor === '#FFB84D' || bgColor === '#FFCC99') ? '#1f2937' : '#ffffff';
                        },
                        font: { weight: 'bold', size: 14 },
                        textStrokeColor: 'rgba(0,0,0,0.3)',
                        textStrokeWidth: 2
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed !== null) {
                                    const total = context.chart.getDatasetMeta(0).total;
                                    const value = context.parsed;
                                    const percentage = ((value / total) * 100).toFixed(1) + '%';
                                    label += `${value} 人 (${percentage})`;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
        
        // --- (新增) 全體人員職類分析 (Pie Chart) ---
        const ctxRole = document.getElementById('roleChart').getContext('2d');
        new Chart(ctxRole, {
            type: 'pie',
            data: {
                labels: ['臨床', '非臨床', '資訊'],
                datasets: [{
                    label: '職類分析',
                    data: [
                        finalDashboardData.roleKpi.clinical,
                        finalDashboardData.roleKpi.nonClinical,
                        finalDashboardData.roleKpi.it
                    ],
                    backgroundColor: [
                        '#FFA500', // 琥珀黃
                        '#6C5CE7', // 紫藍
                        '#003D82'  // 品牌藍
                    ],
                    borderColor: '#FFFFFF',
                    borderWidth: 4,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    datalabels: {
                        formatter: (value, ctx) => {
                            const total = ctx.chart.data.datasets[0].data.reduce((acc, data) => acc + data, 0);
                            const percentage = ((value / total) * 100).toFixed(1) + '%';
                            return percentage;
                        },
                        color: '#ffffff',
                        font: { weight: 'bold', size: 14 },
                        textStrokeColor: 'rgba(0,0,0,0.3)',
                        textStrokeWidth: 2
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed !== null) {
                                    const total = context.chart.getDatasetMeta(0).total;
                                    const value = context.parsed;
                                    const percentage = ((value / total) * 100).toFixed(1) + '%';
                                    label += `${value} 人 (${percentage})`;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
        
        // --- (新增) 決策者分析 (Horizontal Bar Chart) ---
        const ctxDecision = document.getElementById('decisionMakerChart').getContext('2d');
        new Chart(ctxDecision, {
            type: 'bar',
            data: {
                labels: ['決策者', '執行者'],
                datasets: [{
                    label: '關鍵角色',
                    data: [
                        finalDashboardData.decisionMakerKpi.decisionMakers,
                        finalDashboardData.decisionMakerKpi.implementers
                    ],
                    backgroundColor: [
                        '#003D82', // 品牌藍
                        '#708090'  // 灰藍
                    ],
                    barThickness: 50 // 讓長條圖粗一點
                }]
            },
            options: {
                indexAxis: 'y', // 關鍵：轉為水平長條圖
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false, // 隱藏 X 軸
                        grid: { display: false }
                    },
                    y: {
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: {
                        display: false // 隱藏圖例
                    },
                    datalabels: {
                        formatter: (value) => value + ' 人', // 顯示 "XX 人"
                        color: '#ffffff',
                        anchor: 'center', // 顯示在中間
                        align: 'center',
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                    },
                     tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed.x} 人`
                        }
                    }
                }
            }
        });

    }
});
