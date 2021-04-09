const { Assessments } = require(`../Database`);
exports.submit = (assessment, value, riskLevel) => {
  return new Promise(async (resolve, reject) => { //eslint-disable-line
    try {
      const date = new Date();

      let db = {

        'cat_name': assessment.name,
        'cat_date_of_birth': assessment.date,
        'instrument': assessment.title,
        'score': value,
        'risk_level': riskLevel,
        'created_at': date,
        'deleted_at': null
      }
      //inserting assessment data into the database
      let _assesment = Assessments.forge(db).save(null, { method: 'insert' })
      resolve(_assesment);

    } catch (err) {
      reject();
    }
  });
};

//retrieving the data from the database
exports.retrieve = () => {
  return new Promise(async (resolve, reject) => { //eslint-disable-line
    try {
      let assesmentList = await new Assessments().where({deleted_at: null}).fetchAll().catch(function (e) {
        resolve(assesmentList.toJSON());
      });
      resolve(assesmentList.toJSON());
    } catch (err) {
      reject();
    }
  });
};

//performing softdelete and upating the deleted_at column in the database
exports.delete = (assessmentId) => {
  return new Promise(async (resolve, reject) => { //eslint-disable-line
    try {
      const date = new Date();
      await new Assessments({'id':assessmentId}).fetch()
      .then(function (model) {
        if (model) {
          var params = { 'deleted_at': date }
           model.save(params, {
            method: 'update',
            patch: true
          });
        } 
      })
      .then(()=>{resolve()})
      .catch(function (err) {
          
          resolve();
      });

    } catch (err) {
      reject();
    }
  });
};
