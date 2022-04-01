USE teste;

DROP TABLE IF EXISTS teste.Mensagens;

CREATE TABLE IF NOT EXISTS teste.Mensagens (
    id int DEFAULT 0 /*AUTO_INCREMENT*/, 
    texto varchar(2048) NOT NULL, 
    enviado BOOLEAN NOT NULL, 
    PRIMARY KEY(id)
);

INSERT INTO teste.Mensagens (texto, enviado) 
VALUES ('TESTE AUTOMATICO DE CONEXAO: NOTIFICADOR_TELEGRAM OK', 0);