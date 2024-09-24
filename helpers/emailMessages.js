
exports.welcomAmanMessage = (code, name) => {
   
    
    return `
    <div dir="rtl" style="text-align: right;">
        <p> <h2>مرحبا ${name}</h2></p>
        <p>يشرفنا انضمامك إلى متجر أمان.</p>
        <p>كود التحقق الخاص بك هو:</p>
        <h2>${code}</h2>
        <p>لا تقم بمشاركته مع أحد.</p>
    </div>
    `;
};

exports.welcomAgainMessage=(code,name)=>
{
    return  `
    <div dir="rtl" style="text-align: right;">
        <p>مرحبا ${name}،</p>
        <p>كود التحقق الخاص بك هو:</p>
        <h2>${code}</h2>
        <p>لا تقم بمشاركته مع أحد.</p>
    </div>
`
    

 };

