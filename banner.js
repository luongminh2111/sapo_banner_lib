const getBanner = "http://localhost:8080/api/banners/by-code="
// khai baos bien luu tru
const store = []; 

function run(storeItem) {
  // xử lí banner ko hiện nếu chưa ẩn đủ time 1 ngày
  const timeHideSectionLocal = window.localStorage.getItem(
    `${storeItem.pageUrl}${storeItem.divId}${storeItem.id}_recent_time`
  );
  const timeHidePopUpLocal = window.localStorage.getItem(
    `${storeItem.pageUrl}${storeItem.id}_recent_time`
  );

  // neu la popup
  if (storeItem.popUp === 1) {
    if (storeItem.numberHidePopUp != 0) {
      if (timeHidePopUpLocal != null) {
        if (
          window.localStorage.getItem(`${storeItem.pageUrl}${storeItem.id}`) >
          storeItem.numberHidePopUp
        ) {
        } else {
          const timeRecentConvert = Date.parse(timeHidePopUpLocal);
          const day = new Date();
          const curTimeConvert = Date.parse(day);
          // nếu ẩn đủ so ngay quy định thì hiện
          if (
            (curTimeConvert - timeRecentConvert) / 86400 >=
            storeItem.timeHidePopUp
          ) {
            DisplayHidePopUpBanner(storeItem);
          } else {
          }
        }
        // eslint-disable-next-line eqeqeq
      } else {
        DisplayHidePopUpBanner(storeItem);
      }
    } else {
      DisplayNormalPopUpBanner(storeItem);
    }
  }
  // neu ko phai la popup
  else {
    // kiem tra xem banner co an hay khong
    if (storeItem.modeHideSection === 1) {
      if (timeHideSectionLocal != null) {
        if (
          window.localStorage.getItem(
            `${storeItem.pageUrl}${storeItem.divId}${storeItem.id}`
          ) > storeItem.numberHideSection
        ) {
        } else {
          const timeRecentConvert1 = Date.parse(timeHideSectionLocal);
          const day1 = new Date();
          const curTimeConvert1 = Date.parse(day1);
          // nếu ẩn đủ so ngay quy định thì hiện
          if (
            (curTimeConvert1 - timeRecentConvert1) / 86400 >=
            storeItem.timeHideSection
          ) {
            DisplayHideBanner(storeItem);
          } else {
          }
        }
        // eslint-disable-next-line eqeqeq
      } else {
        DisplayHideBanner(storeItem);
      }
    } else {
      DisplayNormalBanner(storeItem);
    }
  }
}
console.log(" store: ", store);
function start(init) {
  fetch(`${getBanner + init.code}/key=${init.key}`)
    .then((response) => response.json())
    .then((data) => {
      data.map((dataItem) => {
        store.push(dataItem);
      });
    });
  // eslint-disable-next-line func-names
  let path0 = window.location.pathname.slice(
    1,
    window.location.pathname.length
  );
  store.map((storeItem) => {
    if (storeItem.pageUrl === path0) {
      run(storeItem);
      // eslint-disable-next-line no-empty
    } else {
      let checkExist = document.getElementById(
        "divPresentation_" + storeItem.id
      );
      if (checkExist != null) {
        checkExist.style.display = "none";
      }
    }
  });
  window.onload = function () {
    let oldHref = document.location.href;
    let path1 = window.location.pathname.slice(
      1,
      window.location.pathname.length
    );

    if (path1.length > 0) {
      store.map((storeItem) => {
        if (storeItem.pageUrl === path1) {
          run(storeItem);
          // eslint-disable-next-line no-empty
        } else {
          let checkExist = document.getElementById(
            "divPresentation_" + storeItem.id
          );
          if (checkExist != null) {
            checkExist.style.display = "none";
          }
        }
      });
      const bodyList = document.querySelector("body");
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // eslint-disable-next-line eqeqeq
          if (oldHref != document.location.href) {
            oldHref = document.location.href;
            let path2 = window.location.pathname.slice(
              1,
              window.location.pathname.length
            );

            // eslint-disable-next-line array-callback-return
            store.map((storeItem) => {
              if (storeItem.pageUrl === path2) {
                run(storeItem);
              } else {
                let checkExist = document.getElementById(
                  "divPresentation_" + storeItem.id
                );
                if (checkExist != null) {
                  checkExist.style.display = "none";
                }
              }
            });
          }
        });
      });
      const config = {
        childList: true,
        subtree: true,
      };
      observer.observe(bodyList, config);
    }
  };
}
module.exports = start;

// đây là hảm hiển thị banner không phải là popup và không có dấu x
function DisplayNormalBanner(data) {
  const a = document.createElement("a");
  let sectionItem = document.getElementById(data.divId);
  if (sectionItem != null) {
    sectionItem.width = data.width;
    sectionItem.height = data.height;
    sectionItem.appendChild(a);
    const img = new Image();
    a.appendChild(img);
    const urlWeb = data.url;
    a.href = urlWeb;
    img.src = data.imgUrl;
    img.width = data.width;
    img.height = data.height;
  }
  a.onclick = function () {
    if (data.type === "Liên kết tới một link mới") {
      a.target = "_blank";
    } else if (data.type === "Liên kết tới một iframe") {
      a.target = "_blank";
    }
  };
}
// đây là hàm hiển thị banner không phải là popup và có dấu x
function DisplayHideBanner(data) {
  const a = document.createElement("a");
  const closeItem = document.createElement("button");
  let sectionItem = document.getElementById(data.divId);
  if (sectionItem != null) {
    sectionItem.width = data.width;
    sectionItem.height = data.height;
    const img = new Image();
    sectionItem.style.position = "relative";
    closeItem.innerHTML = "X";
    closeItem.id = "x";
    closeItem.style.cssText =
      "position: absolute; color: green; top: 0px; right: 0px; width: 20px; height: 20px;" +
      "font-size: 10px; padding: 0; border: none; font-weight: bold; background-color: white; border-radius: 50%";
    const urlWeb = data.url;
    a.href = urlWeb;
    img.src = data.imgUrl;
    img.style.width = data.width + "px";
    img.style.height = data.height + "px";
    sectionItem.appendChild(a);
    a.appendChild(img);
    a.appendChild(closeItem);
  }
  closeItem.onclick = function () {
    hideBanner(data);
  };
  a.onclick = function () {
    if (data.type === "Liên kết tới một link mới") {
      a.target = "_blank";
    } else if (data.type === "Liên kết tới một iframe") {
      window.confirm("Chưa xử lý hỗ trợ iframe");
      // a.target = '_blank';
    }
  };
}
// hàm hiển thị banner popup và được phép ẩn dang dung ben go
function DisplayHidePopUpBanner(data) {
  let checkDivExist = document.getElementById("divPresentation_" + data.id);
  if (checkDivExist === null) {
    const a = document.createElement("a");
    const closeItem = document.createElement("button");
    closeItem.id = `closePresentation_${data.id}`;
    const divChild = document.createElement("div");
    const divPresentation = document.createElement("div");
    divPresentation.id = `divPresentation_${data.id}`;
    divPresentation.appendChild(divChild);
    const img = new Image();
    closeItem.innerHTML = "X";
    const urlWeb = data.url;
    a.href = urlWeb;
    a.id = `aPresentation_${data.id}`;
    img.src = data.imgUrl;
    divChild.appendChild(a);
    a.appendChild(img);
    divChild.appendChild(closeItem);
    document.body.appendChild(divPresentation);
    closeItem.onclick = function () {
      hideBanner(data, divPresentation);
    };
    a.onclick = function () {
      if (data.type === "Liên kết tới một link mới") {
        a.target = "_blank";
      } else if (data.type === "Liên kết tới một iframe") {
        window.confirm("Chưa xử lý hỗ trợ iframe");
        // a.target = '_blank';
      }
    };
    styleForPopupItem(
      divPresentation,
      closeItem,
      divChild,
      data.position,
      data.positionValue,
      data.positionType,
      img,
      data.modal,
      data.width,
      data.height,
      data.bannerWidth
    );
  } else {
    checkDivExist.style.display = "block";
    let closeItem = document.getElementById("closePresentation_" + data.id);
    let a = document.getElementById("aPresentation_" + data.id);
    closeItem.onclick = function () {
      hideBanner(data, checkDivExist);
    };
    a.onclick = function () {
      if (data.type === "Liên kết tới một link mới") {
        a.target = "_blank";
      } else if (data.type === "Liên kết tới một iframe") {
        window.confirm("Chưa xử lý hỗ trợ iframe");
        // a.target = '_blank';
      }
    };
  }
}
// hàm hiển thị banner popup và không ẩn
function DisplayNormalPopUpBanner(data) {
  let checkDivExist = document.getElementById("divPresentation_" + data.id);
  if (checkDivExist === null) {
    const a = document.createElement("a");
    const closeItem = document.createElement("button");
    closeItem.id = `closePresentation_${data.id}`;
    const img = new Image();
    const divChild = document.createElement("div");
    const divPresentation = document.createElement("div");
    let width = data.width;
    let height = data.height;
    if (data.modal === 1 && width >= 900 && width < 1200) {
      width = (width * 3) / 4;
      height = (height * 3) / 4;
    }
    if (data.modal === 1 && width >= 1200) {
      width = width / 2;
      height = height / 2;
    }
    document.body.appendChild(divPresentation);
    divPresentation.id = `divPresentation_${data.id}`;
    divPresentation.appendChild(divChild);
    closeItem.innerHTML = "X";
    closeItem.id = "x";
    const urlWeb = data.url;
    a.href = urlWeb;
    a.id = `aPresentation_${data.id}`;
    img.src = data.imgUrl;
    img.width = width;
    img.height = height;
    divChild.appendChild(a);
    a.appendChild(img);
    divChild.appendChild(closeItem);
    closeItem.onclick = function () {
      divPresentation.style.display = "none";
    };
    a.onclick = function () {
      if (data.type === "Liên kết tới một link mới") {
        a.target = "_blank";
      } else if (data.type === "Liên kết tới một iframe") {
        window.confirm("Chưa xử lý hỗ trợ iframe");
        a.target = "_blank";
      }
    };
    styleForPopupItem(
      divPresentation,
      closeItem,
      divChild,
      data.position,
      data.positionValue,
      data.positionType,
      img,
      data.modal,
      width,
      height,
      data.bannerWidth
    );
  } else {
    checkDivExist.style.display = "block";
    let closeItem = document.getElementById("closePresentation_" + data.id);
    let a = document.getElementById("aPresentation_" + data.id);
    closeItem.onclick = function () {
      divPresentation.style.display = "none";
    };
    a.onclick = function () {
      if (data.type === "Liên kết tới một link mới") {
        a.target = "_blank";
      } else if (data.type === "Liên kết tới một iframe") {
        window.confirm("Chưa xử lý hỗ trợ iframe");
        // a.target = '_blank';
      }
    };
  }
}

function styleForPopupItem(
  divId,
  closeItem,
  divChild,
  position,
  positionValue,
  positionType,
  img,
  modal,
  width,
  height,
  bannerWidth
) {
  let distanceLeft = (window.innerWidth - width) / 2;
  let distanceTop = (window.innerHeight - height) / 4;
  // truong hop hien thi mặc định
  if (modal === 0) {
    if (position === "default") {
      divId.style.cssText = `position: absolute; z-index: 91; top: ${distanceTop}px; left: ${distanceLeft}px;`;

      img.style.cssText = `width: 100%`;

      closeItem.style.cssText =
        "position: absolute; color: green; top: 0px; right: 0px; z-index: 100; width: 20px; height: 20px;" +
        "font-size: 10px; padding: 0; border: none; font-weight: bold; background-color: white; border-radius: 50%";
    } else {
      cssModalPopUp(
        position,
        positionType,
        positionValue,
        divId,
        img,
        closeItem,
        bannerWidth
      );
    }
  } else {
    if (position === "default") {
      divId.style.cssText =
        "position: fixed; z-index: 90; width: 100vw; height: 100vh; top: 0; left: 0; background-color: rgb(127,127,127,0.7);";

      divChild.style.cssText = `position: absolute; z-index: 90; top: ${distanceTop}px; left:${distanceLeft}px; `;

      closeItem.style.cssText =
        "position: absolute; color: red; top: 0px; right: 0px; z-index: 90; width: 20px; height: 20px;" +
        "font-size: 15px; padding: 0; border: none; font-weight: bold; background-color: white; border-radius: 50%";
    } else {
      divId.style.cssText =
        "position: fixed; z-index: 90; width: 100vw; height: 100vh; top: 0; left: 0; background-color: rgb(127,127,127,0.7);";
      cssModalPopUp(
        position,
        positionType,
        positionValue,
        divChild,
        img,
        closeItem
      );
    }
  }
}
function cssModalPopUp(
  position,
  positionType,
  positionValue,
  divId,
  img,
  closeItem
) {
  const splitIndex1 = position.indexOf("-");
  const splitIndex2 = positionValue.indexOf(",");
  const pst1 = position.slice(0, splitIndex1);

  const pst2 = position.slice(splitIndex1 + 1, position.length);
  const pstVl1 = positionValue.slice(0, splitIndex2);
  const pstVl2 = positionValue.slice(splitIndex2 + 1, position.length);
  // neu position co type là fixed  =>
  if (positionType === "fixed") {
    if (pstVl2 === 0 && bannerWidth === "fullWidth") {
      divId.style.cssText = `position: ${positionType}; z-index: 90; ${pst1}: ${Number(
        pstVl1
      )}px; ${pst2}: ${Number(pstVl2)}px; width :-webkit-fill-available`;
      img.style.cssText = `width: 100%`;
    } else {
      divId.style.cssText = `position: ${positionType}; z-index: 90; ${pst1}: ${Number(
        pstVl1
      )}px; ${pst2}: ${Number(pstVl2)}px; width :calc(100% - 10px);`;
      img.style.cssText = `width: 100%`;
    }
  }
  if (positionType === "absolute") {
    divId.style.cssText = `position: ${positionType}; z-index: 90; ${pst1}: ${Number(
      pstVl1
    )}px; ${pst2}: ${Number(pstVl2)}px; width :calc(100% - 10px);`;
    img.style.cssText = `width: 100%`;
  } else {
    if (pstVl2 === 0 && bannerWidth === "fullWidth") {
      divId.style.cssText = `position: ${positionType}; z-index: 90; ${pst1}: ${Number(
        pstVl1
      )}px; ${pst2}: ${Number(pstVl2)}px; width :-webkit-fill-available`;
      img.style.cssText = `width: 100%`;
    } else {
      divId.style.cssText = `position: ${positionType}; z-index: 90; ${pst1}: ${Number(
        pstVl1
      )}px; ${pst2}: ${Number(pstVl2)}px; width :calc(100% - 10px);`;
      img.style.cssText = `width: 100%`;
    }
  }
  closeItem.style.cssText =
    "position: absolute; color: red; top: 0px; right: 0px; z-index: 90; width: 20px; height: 20px;" +
    "font-size: 15px; padding: 0; border: none; font-weight: bold; background-color: white; border-radius: 50%";
}
// hàm đóng ẩn banner
function hideBanner(data, divPresentation) {
  const today = new Date();
  if (data.divId != "null") {
    document.getElementById(data.divId).style.display = "none";
    if (
      window.localStorage.getItem(`${data.pageUrl}${data.divId}${data.id}`) ==
      null
    ) {
      window.localStorage.setItem(`${data.pageUrl}${data.divId}${data.id}`, 1);
      window.localStorage.setItem(
        `${data.pageUrl}${data.divId}${data.id}_recent_time`,
        today
      );
    } else {
      const number_closed = window.localStorage.getItem(
        `${data.pageUrl}${data.divId}${data.id}`
      );
      window.localStorage.setItem(
        `${data.pageUrl}${data.divId}${data.id}`,
        Number(number_closed) + 1
      );
      window.localStorage.setItem(
        `${data.pageUrl}${data.divId}${data.id}_recent_time`,
        today
      );
    }
  }
  if (divPresentation != "undefined" || divPresentation != null) {
    divPresentation.style.display = "none";

    if (window.localStorage.getItem(`${data.pageUrl}${data.id}`) == null) {
      window.localStorage.setItem(`${data.pageUrl}${data.id}`, 1);
      window.localStorage.setItem(
        `${data.pageUrl}${data.id}_recent_time`,
        today
      );
    } else {
      const number_closed = window.localStorage.getItem(
        `${data.pageUrl}${data.id}`
      );
      window.localStorage.setItem(
        `${data.pageUrl}${data.id}`,
        Number(number_closed) + 1
      );
      window.localStorage.setItem(
        `${data.pageUrl}${data.id}_recent_time`,
        today
      );
    }
  }
}
