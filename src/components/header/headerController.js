import * as Data from "../../Data";

export const getHeaderMessage = () => {
  let topMessage = Data.headerTopMessage;
  return topMessage;
};

export const getSiteLogo = () => {
  let logo = Data.siteLogo;
  return logo;
};

export const redictect = (e, url, history) => {
  e.preventDefault();
  history.push(url);
};

export const addFilters = (e, dispatchedData, dispatch, history) => {
  e.preventDefault();
  let parentValue = [];
  let txonomy = dispatchedData.taxonomy;
  let taxonomyValue = dispatchedData.taxonomyValue;
  let taxonomyUrl = dispatchedData.taxonomyUrl;
  let redirect_Url = dispatchedData.redirectUrl;

  // dispatch the item into the data layer
  dispatch({
    type: "ADD_FILTERS",
    filterItems: {
      [txonomy]: taxonomyValue,
      [redirect_Url]: taxonomyUrl,
    },
  });
  history.push(`/category/${taxonomyUrl}`);
};

export const getTaxonomy = (argDept, argTyp, argsubTyp_1) => {
  let level = 1;
  let categories = [];

  let i = 0;
  if (argsubTyp_1 != null) {
    level = 4;
  } else if (argTyp != null) {
    level = 3;
  } else if (argDept != null) {
    level = 2;
  } else level = 1;

  switch (level) {
    case 1:
      categories = [];
      i = 0;
      Data.taxonomy.map((cat) => {
        if (cat.typ == "Empty") {
          categories.push({
            taxonomy: "dept",
            category: cat.dept,
            url: cat.url,
          });
        }
      });
      return categories;
      break;
    case 2:
      categories = [];
      i = 0;
      Data.taxonomy.map((cat) => {
        if (
          cat.dept == argDept &&
          cat.typ != "Empty" &&
          cat.subTyp_1 == "Empty"
        ) {
          categories.push({ taxonomy: "typ", category: cat.typ, url: cat.url });
        }
      });
      return categories;
      break;
    case 3:
      categories = [];
      i = 0;
      Data.taxonomy.map((cat) => {
        if (
          cat.dept == argDept &&
          cat.typ == argTyp &&
          cat.subTyp_1 != "Empty" &&
          cat.subTyp_2 == "Empty"
        ) {
          i++;
          categories.push({
            taxonomy: "subTyp_1",
            category: cat.subTyp_1,
            url: cat.url,
          });
        }
      });
      return categories;
      break;
    case 4:
      categories = [];
      i = 0;
      Data.taxonomy.map((cat) => {
        if (
          cat.dept == argDept &&
          cat.typ == argTyp &&
          cat.subTyp_1 == argsubTyp_1 &&
          cat.subTyp_2 != "Empty"
        ) {
          i++;
          categories.push({
            taxonomy: "subTyp_2",
            category: cat.subTyp_2,
            url: cat.url,
          });
        }
      });
      return categories;
      break;
  }
};
