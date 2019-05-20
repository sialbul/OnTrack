Create database Ontrack;
use Ontrack;

CREATE TABLE IF NOT EXISTS events
(
  id int(11) NOT NULL auto_increment,
  title varchar(255) NOT NULL,
  start datetime NOT NULL,
  end datetime NOT NULL,
  primary key (id)
) ;

