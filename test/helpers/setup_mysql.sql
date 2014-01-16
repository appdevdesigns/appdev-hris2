CREATE TABLE sites_multilingual_labels (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  language_code text,
  label_key text,
  label_label text,
  label_needstranslation text,
  label_application text,
  label_context text,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;

CREATE TABLE sites_multilingual_languages (
  language_id int(11) unsigned NOT NULL AUTO_INCREMENT,
  language_code varchar(10) NOT NULL,
  language_label text,
  PRIMARY KEY (language_id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;