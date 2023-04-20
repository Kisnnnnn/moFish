import { USER_ID, db } from '@/constants';

const putInfo = async (param: object) => {
  const dbSql = db.info;

  if (!dbSql || !USER_ID) {
    return;
  }
  console.log({
    userId: USER_ID,
    ...param,
  });

  dbSql
    .put({
      userId: USER_ID,
      ...param,
    })
    .then((r) => {
      console.log(r);
    });

  return true;
};

const getInfo = async () => {
  const dbSql = db.info;

  if (!dbSql || !USER_ID) {
    return {};
  }
  let result = await dbSql.where('userId').equals(USER_ID).first();

  if (result) {
    return result;
  }
  return {};
};

// 翻译
const putTranslate = async (param: object) => {
  const dbSql = db.tranlateTable;

  if (!dbSql || !USER_ID) {
    return;
  }
  console.log({
    userId: USER_ID,
    ...param,
  });

  dbSql
    .put({
      userId: USER_ID,
      ...param,
    })
    .then((r) => {
      console.log(r);
    });

  return true;
};

const getTranslate = async () => {
  const dbSql = db.tranlateTable;

  if (!dbSql || !USER_ID) {
    return {};
  }
  let result = await dbSql.where('userId').equals(USER_ID).first();

  if (result) {
    return result;
  }

  return {};
};
export { putInfo, getInfo, getTranslate, putTranslate };
