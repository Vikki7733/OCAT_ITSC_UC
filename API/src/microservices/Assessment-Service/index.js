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