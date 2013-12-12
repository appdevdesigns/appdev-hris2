
//describe the table's and their initial values here:
var tables = {
        site_multilingual_label:{
            model: SiteMultilingualLabel,
            fields: 'id, language_code, label_key, label_label, label_needs_translation, label_context',
            values:[
                    '1,        "en",    "test.label.one",   "Label one",        0,       "site.common"',
                    '2,        "ko",    "test.label.one",   "[ko]Label one",    0,       "site.common"',
                    '3,        "en",    "test.label.two",   "Label two",        0,       "site.common"',
                    '4,        "ko",    "test.label.three", "[ko]Label three",  0,       "site.common"',
                    '5,        "en",    "test.label.four",   "Label four",      0,       "site.common"',

             ]
        }

}



module.exports= tables;
