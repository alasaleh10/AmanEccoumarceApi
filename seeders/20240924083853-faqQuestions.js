'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('faqQuestions', [
      {
        question: "ما هو متجر أمان؟",
        answer: "متجر أمان هو متجر إلكتروني لتسوق المنتجات."
      },
      {
        question: "كيف أقوم بالتسجيل؟",
        answer: "يمكنك التسجيل من خلال التطبيق أو الموقع الإلكتروني."
      },
      {
        question: "ما هي طرق الدفع المتاحة؟",
        answer: "تتوفر عدة طرق للدفع مثل البطاقات الائتمانية."
      },
      {
        question: "هل يمكنني إلغاء طلبي بعد تأكيده؟",
        answer: "يمكنك إلغاء الطلب قبل شحنه من خلال صفحة 'طلباتي' أو التواصل مع خدمة العملاء."
      },
      {
        question: "كيف يمكنني تتبع طلبي؟",
        answer: "يمكنك تتبع طلبك من خلال صفحة 'طلباتي' في التطبيق أو عبر البريد الإلكتروني."
      },
      {
        question: "هل يمكنني إعادة المنتج؟",
        answer: "نعم، يمكنك إعادة المنتج في غضون 14 يومًا من تاريخ الاستلام بشرط أن يكون بحالته الأصلية."
      },
  
      {
        question: "هل يتوفر دعم فني للعملاء؟",
        answer: "نعم، يتوفر فريق دعم العملاء على مدار الساعة عبر الهاتف أو البريد الإلكتروني."
      },
    
      {
        question: "كيف يمكنني تغيير عنوان التسليم؟",
        answer: "يمكنك تغيير عنوان التسليم قبل شحن الطلب من خلال صفحة 'طلباتي' أو عبر خدمة العملاء."
      },
      {
        question: "هل يتم تقديم عروض وخصومات؟",
        answer: "نعم، نقدم عروض وخصومات موسمية، يمكنك متابعة التطبيق والبريد الإلكتروني للبقاء على اطلاع."
      }

    ]);
  },

  async down (queryInterface, Sequelize) {
 await queryInterface.bulkDelete('faqQuestions', null, {});
  }
};