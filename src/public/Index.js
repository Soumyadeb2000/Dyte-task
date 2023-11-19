const parentElm = document.getElementById('queried-logs');

async function filterLog(e) {
    try {
        e.preventDefault();
        const filter = e.target.filter.value;
        const filterData = e.target.filterData.value;
        parentElm.innerHTML = "";
        const response = await axios.get(`http://localhost:3000/filter/${filter}?data=${filterData}`);
        display(response.data);
    } catch (error) {
        console.log(error);
    }
}

async function range(e) {
    e.preventDefault();
    try {
        let start = e.target.start.value;
        let end = e.target.end.value;
        start = new Date(start).toISOString();
        end = new Date(end).toISOString();
        parentElm.innerHTML = "";
        const response = await axios.get(`http://localhost:3000/filterTime/?start=${start}&end=${end}`);
        display(response.data);        
    } catch (error) {
        console.log(error);
    }
}

async function fullTextSearch(e) {
    e.preventDefault();
    try {
        const text = e.target.fullText.value;
        parentElm.innerHTML = "";
        const response = await axios.get(`http://localhost:3000/filterRegex/?text=${text}`);
        console.log(response.data);
        display(response.data);
    } catch (error) {
        console.log(error);
    }

}

async function ingest(e) {
    e.preventDefault();
    try {
        let log = e.target.ingestor.value;
        log = JSON.parse(log)
        await axios.post(`http://localhost:3000/ingest`, log);
    } catch (error) {
        console.log(error);
    }

}

function showOnScreen(data) {
    try {
        let parentElm = document.getElementById('queried-logs');
        let childElm = document.createElement('p');
        childElm.style.backgroundColor = "lightgrey";
        childElm.className = "card-body rounded m-3"
        childElm.innerHTML = `<pre>
    
            {
                "level": "${data.level}",
                "message": "${data.message}",
                "timestamp": "${data.timestamp}",
                "traceId": ${data.traceId}",
                "spanId": "${data.spanId}",
                "commit": "${data.commit}",
                "metadata": {
                    "parentResourceId": ${data.metadata.parentResourceId}"
                }
            }
        </pre>`;
        parentElm.appendChild(childElm);
    
    } catch (error) {
        console.log(error);
    }
}

function display(data) {
    data.forEach(log => {
        showOnScreen(log);
    })
}