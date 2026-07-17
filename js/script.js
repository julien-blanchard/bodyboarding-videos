const ROOT_WRAPPER = "table-wrapper";
const VIDEO_WRAPPER = "video-wrapper";
const TABLE_HEADERS = ["Track","Section","Band","Title","Info","Listen"];

const createWrapper = () => {
    let root_wrapper = document.getElementById(ROOT_WRAPPER);
    let video_wrapper = document.createElement("div");
    video_wrapper.setAttribute("id",VIDEO_WRAPPER);
    root_wrapper.appendChild(video_wrapper);
};

const createLink = (link_target,link_adress,link_type) => {
    let t_link = document.createElement("a");
    let t_target = document.createTextNode(link_target);
    t_link.appendChild(t_target);
    t_link.href = link_adress;
    if (link_type === "external") {
        t_link.target = "_blank";
    }
    else {
        t_link.target = "";
    }
    return t_link;
};

const createListOfTitles = (data,filter_by) => {
    let video_wrapper = document.getElementById(VIDEO_WRAPPER);
    let video_list_div = document.createElement("div");
    video_list_div.setAttribute("id","video-list_div");
    let video_list_header = document.createElement("h5");
    let video_list_header_text = document.createTextNode(`Videos matching the selection '${filter_by}':`);
    let video_list_ul = document.createElement("ul");
    video_list_ul.setAttribute("id","video-list-ul");
    video_list_header.appendChild(video_list_header_text);
    video_wrapper.appendChild(video_list_header);
    video_wrapper.appendChild(video_list_div);
    video_list_div.appendChild(video_list_ul);
    let id_val = 1;
    for (let d of data) {
        if (d["Tags"].includes(filter_by)) {
            let video_title = d["Title"].replace("\END","");
            let video_id = `#video-table-header-${id_val.toString()}`;
            let video_list_li = document.createElement("li");
            let video_list_a = createLink(video_title,video_id,"internal");
            video_list_li.appendChild(video_list_a);
            video_list_ul.appendChild(video_list_li);
            id_val++;
        }
    };
};

const createHeader = (data,id_val) => {
    let video_table_header = `video-table-header-${id_val.toString()}`;
    let video_wrapper = document.getElementById(VIDEO_WRAPPER);
    let video_header = document.createElement("h2");
    video_header.setAttribute("class","video-header");
    video_header.setAttribute("id",video_table_header);
    let video_value = document.createTextNode(data.replace("\rEND",""));
    video_header.appendChild(video_value);
    video_wrapper.appendChild(video_header);
};

const createTags = (data) => {
    let video_wrapper = document.getElementById(VIDEO_WRAPPER);
    for (let d of data.slice(1)) {
        let video_tag = document.createElement("kbd");
        let video_tag_value = document.createTextNode(d);
        video_tag.appendChild(video_tag_value);
        video_wrapper.appendChild(video_tag);
    };
};

const createTable = (id_val) => {
    let video_id = `video-table-${id_val.toString()}`;
    let video_wrapper = document.getElementById(VIDEO_WRAPPER);
    let video_table = document.createElement("table");
    video_table.setAttribute("id",video_id);
    video_wrapper.appendChild(video_table);
};

const createTableHeader = (id_val) => {
    let video_id = `video-table-${id_val.toString()}`;
    let video_header_id = `video-header-${id_val.toString()}`;
    let video_table = document.getElementById(video_id);
    let new_header = document.createElement("thead");
    new_header.setAttribute("id",video_header_id);
    video_table.appendChild(new_header);
    let table_header = document.getElementById(video_header_id);
    for (let t of TABLE_HEADERS) {
        let th = document.createElement("th");
        let t_value = document.createTextNode(t);
        th.appendChild(t_value);
        table_header.appendChild(th);
    }
};

const createTableRows = (id_val, row_vals) => {
    let video_id = `video-table-${id_val.toString()}`;
    let video_table = document.getElementById(video_id);
    for (let row of row_vals) {
        let new_row = video_table.insertRow()
        for (let r of row) {
            let td = document.createElement("td");
            if (r.includes("discogs")) {
                let t_value = createLink("Discogs",r,"external");
                td.appendChild(t_value);
            }
            else if (r.includes("youtube")) {
                let t_value = createLink("YouTube",r,"external");
                td.appendChild(t_value);
            }
            else if (r.includes("soundcloud")) {
                let t_value = createLink("SoundCloud",r,"external");
                td.appendChild(t_value);
            }
            else if (r.includes("bandcamp")) {
                let t_value = createLink("Bandcamp",r,"external");
                td.appendChild(t_value);
            }
            else {
                let t_value = document.createTextNode(r);
                td.appendChild(t_value);
            }
            new_row.appendChild(td);
        }
        video_table.appendChild(new_row);
    }
};

const clearUserInput = () => {
    try {
        let table_rating = document.getElementById(VIDEO_WRAPPER);
        table_rating.remove()
    }
    catch (err) {
        console.log("Table doesn't exist");
    } 
};
