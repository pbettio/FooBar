"use strict";

//-----------------------------------IMPORT--------------------------------------//
//-----formatted time-----//
import { urlApi, dateFormatter } from "./modules/extra";

//-----------------------------------INITIALIZE--------------------------------------//
document.addEventListener("DOMContentLoaded", init);

function init() {
  fetchData();
}
function fetchData() {
  fetch(urlApi, {
    method: "get",
  })
    .then((e) => e.json())
    .then((data) => {
      showData(data);
      setInterval(fetchDataInterval, 1000);
    });
}
function showData(data) {
  bartendersUnit(data.bartenders);
  storageUnit(data.storage);
  queueUnit(data.queue);
  tapsUnit(data.taps);
  servingUnit(data.serving);
}
function fetchDataInterval() {
  fetch(urlApi, {
    method: "get",
  })
    .then((e) => e.json())
    .then((data) => {
      updateData(data);
    });
}
function updateData(data) {
  updatedBartendersUnit(data.bartenders);
  updatedStorageUnit(data.storage);
  updatedQueueUnit(data.queue);
  updatedTapsUnit(data.taps);
  updatedServingUnit(data.serving);
}

//---------------------------------NEXT IN LINE--------------------------------------//
function queueUnit(queue) {
  console.log(queue);
  const templateQueue = document.querySelector("#queueTemplate").content;
  const queueArea = document.querySelector("#queueUnit");

  queueArea.innerHTML = "";
  queue.forEach((inQueue) => {
    const storageQueue = templateQueue.cloneNode(true);

    //-----append-----//
    queueArea.appendChild(storageQueue);
  });
  updatedQueueUnit(queue);
}

function updatedQueueUnit(queue) {
  document.querySelectorAll("#queueUnit article").forEach((inQueue, index) => {
    inQueue.querySelector("p.id").textContent = queue[index].id;
    inQueue.querySelector("p.startTime").textContent = queue[index].startTime;
    inQueue.querySelector("p.order").textContent = queue[index].order;
  });
}

/* function queueUnit(queue) {
  console.log(queue);
  const templateQueue = document.querySelector("#queueTemplate").content;
  const queueArea = document.querySelector("#queueUnit");
  const storageQueue = templateQueue.cloneNode(true);

  queueArea.innerHTML = "";

  storageQueue.querySelector("article").dataset.name = inQueue.id;
  queueArea.appendChild(storageQueue);

  updatedQueueUnit(queue);
}

function updatedQueueUnit(queue) {
  queue.forEach((inQueue) => {
    const queueArticle = document.querySelector(
      `#queueUnit article[data-name="${inQueue.id}"]`
    );
    queueArticle.querySelector("p.order").textContent = inQueue.order;
    queueArticle.querySelector("p.startTime").textContent = inQueue.startTime;
  });
} */

//-----------------------------------BARTENDERS--------------------------------------//
function bartendersUnit(bartenders) {
  console.log(bartenders);
  const templateBartenders = document.querySelector("#bartendersTemplate")
    .content;
  const bartendersArea = document.querySelector("#bartendersUnit");

  bartendersArea.innerHTML = "";
  bartenders.forEach((oneBartender) => {
    const cloneBartender = templateBartenders.cloneNode(true);
    cloneBartender.querySelector("p.name").textContent = oneBartender.name;

    //-----append-----//
    bartendersArea.appendChild(cloneBartender);
  });
  updatedBartendersUnit(bartenders);
}

function updatedBartendersUnit(bartenders) {
  document
    .querySelectorAll("#bartendersUnit article")
    .forEach((oneBartender, index) => {
      oneBartender.querySelector("p.status").textContent =
        bartenders[index].status;
      oneBartender.querySelector("p.servingCustomer").textContent =
        bartenders[index].servingCustomer;
      oneBartender.querySelector("p.usingTap").textContent =
        bartenders[index].usingTap;
      oneBartender.querySelector("p.statusDetail").textContent =
        bartenders[index].statusDetail;
    });
}

//-----------------------------------STORAGE--------------------------------------//
function storageUnit(storage) {
  console.log(storage);
  const templateStorage = document.querySelector("#storageTemplate").content;
  const storageArea = document.querySelector("#storageUnit");

  storageArea.innerHTML = "";
  storage.forEach((oneKeg) => {
    const cloneStorage = templateStorage.cloneNode(true);

    cloneStorage.querySelector("p.name").textContent = oneKeg.name;

    //-----append-----//
    storageArea.appendChild(cloneStorage);
  });
  updatedStorageUnit(storage);
}

function updatedStorageUnit(storage) {
  document.querySelectorAll("#storageUnit article").forEach((oneKeg, index) => {
    /* oneKeg.querySelector("p.name").textContent = storage[index].name; */
    oneKeg.querySelector("p.amount").textContent = storage[index].amount;
    //sort by most to least popular
    /* storage.sort((a, b) => (a.amount > b.amount ? 1 : -1)); */
  });
}

//-----------------------------------TAPS UNIT--------------------------------------//
function tapsUnit(taps) {
  console.log(taps);
  const templateTaps = document.querySelector("#tapsTemplate").content;
  const tapsArea = document.querySelector("#tapsUnit");

  tapsArea.innerHTML = "";
  taps.forEach((oneTap) => {
    const cloneTaps = templateTaps.cloneNode(true);

    tapsArea.appendChild(cloneTaps);
  });
  updatedTapsUnit(taps);
}

function updatedTapsUnit(taps) {
  document.querySelectorAll("#tapsUnit article").forEach((oneTap, index) => {
    oneTap.querySelector("p.id").textContent = taps[index].id;
    oneTap.querySelector("p.beer").textContent = taps[index].beer;
    oneTap.querySelector("p.inUse").textContent = taps[index].inUse;
    oneTap.querySelector("p.level").textContent = taps[index].level;
  });
}

//---------------------------------SERVING NEXT--------------------------------------//
function servingUnit(serving) {
  console.log(serving);

  const templateServing = document.querySelector("#servingTemplate").content;
  const servingArea = document.querySelector("#servingUnit");

  servingArea.innerHTML = "";
  serving.forEach((oneCustomer) => {
    const cloneServing = templateServing.cloneNode(true);

    servingArea.appendChild(cloneServing);
  });
  updatedServingUnit(serving);
}

function updatedServingUnit(serving) {
  document
    .querySelectorAll("#servingUnit article")
    .forEach((oneCustomer, index) => {
      oneCustomer.querySelector("p.id").textContent = serving[index].id;
      oneCustomer.querySelector("p.order").textContent = serving[index].order;
      oneCustomer.querySelector("p.startTime").textContent =
        serving[index].startTime;
    });
}
