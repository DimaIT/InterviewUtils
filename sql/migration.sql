CREATE SCHEMA dummy;

-- for mysql
USE dummy;

CREATE TABLE company
(
	id   int PRIMARY KEY NOT NULL,
	name varchar(255)
);
CREATE UNIQUE INDEX company_id_uindex ON company (id);


CREATE TABLE worker
(
	id         int PRIMARY KEY NOT NULL,
	company_id int,
	chief_id   int,
	name       varchar(255),
	salary     decimal default '0',

	constraint worker_company_id_fk
	foreign key (company_id) references company (id)
	on update cascade on delete cascade,
	constraint worker_worker_id_fk
	foreign key (chief_id) references worker (id)
);
create index worker_company_id_fk on worker (company_id);
create index worker_worker_id_fk on worker (chief_id);


INSERT INTO company (id, name) VALUES (1, 'Apple'), (2, 'Google'), (3, 'Microsoft'), (4, 'Novichok');
INSERT INTO worker (id, company_id, chief_id, name, salary) VALUES
	(1, 1, null, 'Steve', 19000),
	(2, 1, 1, 'Tim', 25000),
	(3, 1, 2, 'Jony', 12000),
	(4, 1, 2, 'Petya', 1500),
	(5, 2, null, 'Sergey', 21000),
	(6, 2, null, 'Lawrence', 17000),
	(7, 2, 6, 'Eric', 16000),
	(8, 2, 8, 'Kolya', 3100),
	(9, 2, 8, 'Ivan', 3100),
	(10, 2, 3, 'Vanya', 1700),
	(11, 3, null, 'Bill', 35000),
	(12, 3, null, 'John', 12000),
	(13, 3, null, 'Reid', 16000),
	(14, 3, 12, 'Hugh', 3100),
	(15, 3, 12, 'Teri', 4100),
	(16, 3, 12, 'Satya', 8100),
	(17, 3, 12, 'Charles', 1100),
	(18, 4, null, 'Boshirov', 500),
	(19, 4, 18, 'Petrov', 900);


