<?php 


 public function getTR_HISTORIAL_TERAPIA()
    {

        try {

            global $http;

            $numeroPedido = $http->query->get('numeroPedido');
            $id = $http->query->get('id');

            if ($numeroPedido !== null) {
                $sql = " SELECT ID, DATA from FORMULARIOTERAPIARESPIRATORIA where FORMULARIOTERAPIARESPIRATORIA.NUMERODEPEDIDO = '$numeroPedido' order by ID desc ";
            } else if ($id !== null) {
                $sql = " SELECT * from FORMULARIOTERAPIARESPIRATORIA where FORMULARIOTERAPIARESPIRATORIA.ID  = '$id'  order by ID desc ";
            } else {
                throw new ModelsException('No existe parametros.');
            }

            # Conectar base de datos
            $this->conectar_Oracle_MV();

            $this->setSpanishOracle_Emil();

            # Execute
            $stmt = $this->_conexion->query($sql);

            $this->_conexion->close();

            $dataPedido = $stmt->fetchAll();

            $pedidos = array();

            foreach ($dataPedido as $key) {
                $_DATA = json_decode($key['DATA'], true);
                $DATA['ID'] = (int) $key['ID'];
                $DATA['ESTADO'] = $_DATA['ESTADO'];
                $DATA['FECHAHOY'] = $_DATA['FECHAHOY'];
                $DATA['FECHAREGISTRO'] = $_DATA['FECHAREGISTRO'];
                $DATA['Usuario'] = $_DATA['Usuario'];

                $pedidos[] = $DATA;
            }

            $_pedidos = $this->orderMultiDimensionalArray($pedidos, 'FECHAHOY', 'desc');

            return array(
                'status' => true,
                'data' => $_pedidos,
            );
        } catch (ModelsException $e) {

            return array(
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            );
        }
    }


 public function getPedidosTR()
    {

        try {

            global $http;

            $typeFilter = $http->query->get('idFiltro');

            # Conectar base de datos
            $this->conectar_Oracle_MV();

            $this->setSpanishOracle();

            $fechaHoy = date("d-m-Y");

            if ($typeFilter == '1') {

                # Devolver todos los resultados
                $sql = " SELECT t1.cd_pre_med, t5.tp_atendimento, t5.cd_paciente,
                t6.nm_paciente,
                TRUNC((MONTHS_BETWEEN(SYSDATE, t6.dt_nascimento)) / 12) || ' AÑOS' EDAD,
                t1.cd_atendimento AT_MV,
                e.ds_especialid ESPECIALIDAD,
                t4.nm_prestador MED_MV,
                t1.cd_pre_med,
                TRUNC(t1.dh_impressao) fecha_pedido,
                TO_CHAR(t1.dh_impressao, 'HH24:MI') hora_pedido,
                l.ds_leito UBICACION,
                ui.ds_unid_int SECTOR,
                editor_custom.fun_signos_vitales_h(t5.cd_paciente,8) PESO,
                editor_custom.fun_signos_vitales_h(t5.cd_paciente,9) ALTURA,
                s.ds_servico SERVICIO
         FROM pre_med t1,
              atendime t5,
              prestador t4,
              especialid e,
              paciente t6,
              leito l,
              unid_int ui,
              servico s
         WHERE
           TRUNC(t1.dh_impressao) = '$fechaHoy' AND
           t1.cd_pre_med IN
             (SELECT t3.cd_pre_med
              FROM   itpre_med t3
              WHERE  t3.cd_tip_esq = 'GAS'
              and NVL(t3.sn_cancelado,'N') = 'N' -- Aquí se controla que se muestre las prescripciones que tienen al menos un item activo
              )
           AND t1.cd_objeto IN (420)
           AND t1.fl_impresso = 'S'
           AND t1.cd_atendimento = t5.cd_atendimento
           AND t5.tp_atendimento IN ('U','I')
           AND t5.cd_paciente = t6.cd_paciente
           AND t5.cd_especialid = e.cd_especialid (+)
           AND t5.cd_leito = l.cd_leito (+)
           AND t5.cd_prestador = t4.cd_prestador (+)
           AND l.cd_unid_int = ui.cd_unid_int (+)
           AND t5.cd_servico = s.cd_servico (+) ";
            } elseif ($typeFilter == '2') {

                $fechaDesde = $http->query->get('fechaDesde');
                $fechaHasta = $http->query->get('fechaHasta');

                # Devolver todos los resultados
                $sql = "SELECT t1.cd_pre_med, t5.tp_atendimento, t5.cd_paciente,
                   t6.nm_paciente,
                   TRUNC((MONTHS_BETWEEN(SYSDATE, t6.dt_nascimento)) / 12) || ' AÑOS' EDAD,
                   t1.cd_atendimento AT_MV,
                   e.ds_especialid ESPECIALIDAD,
                   t4.nm_prestador MED_MV,
                   t1.cd_pre_med,
                   TRUNC(t1.dh_impressao) fecha_pedido,
                   TO_CHAR(t1.dh_impressao, 'HH24:MI') hora_pedido,
                   l.ds_leito UBICACION,
                   ui.ds_unid_int SECTOR,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,8) peso,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,9) ALTURA,
                   s.ds_servico SERVICIO
            FROM pre_med t1,
                 atendime t5,
                 prestador t4,
                 especialid e,
                 paciente t6,
                 leito l,
                 unid_int ui,
                 servico s
            WHERE
              t1.cd_pre_med IN
                (SELECT t3.cd_pre_med
                 FROM   itpre_med t3
                 WHERE  t3.cd_tip_esq = 'GAS'
                 and NVL(t3.sn_cancelado,'N') = 'N' -- Aquí se controla que se muestre las prescripciones que tienen al menos un item activo
                 )
              AND t1.cd_objeto IN (420)
              AND t1.fl_impresso = 'S'
              AND t1.cd_atendimento = t5.cd_atendimento
              AND t5.tp_atendimento IN ('U','I')
              AND t5.cd_paciente = t6.cd_paciente
              AND t5.cd_especialid = e.cd_especialid (+)
              AND t5.cd_leito = l.cd_leito (+)
              AND t5.cd_prestador = t4.cd_prestador (+)
              AND l.cd_unid_int = ui.cd_unid_int (+)
              AND t5.cd_servico = s.cd_servico (+)
              AND TRUNC(t1.dh_impressao) >= TO_DATE('$fechaDesde', 'DD-MM-YYYY')
              AND TRUNC(t1.dh_impressao) <= TO_DATE('$fechaHasta', 'DD-MM-YYYY')
              order by t1.cd_pre_med desc ";
            } elseif ($typeFilter == '3') {

                $fechaDesde = $http->query->get('fechaDesde');
                $fechaHasta = $http->query->get('fechaHasta');

                # Devolver todos los resultados
                $sql = "SELECT t1.cd_pre_med, t5.tp_atendimento, t5.cd_paciente,
                   t6.nm_paciente,
                   TRUNC((MONTHS_BETWEEN(SYSDATE, t6.dt_nascimento)) / 12) || ' AÑOS' EDAD,
                   t1.cd_atendimento AT_MV,
                   e.ds_especialid ESPECIALIDAD,
                   t4.nm_prestador MED_MV,
                   t1.cd_pre_med,
                   TRUNC(t1.dh_impressao) fecha_pedido,
                   TO_CHAR(t1.dh_impressao, 'HH24:MI') hora_pedido,
                   l.ds_leito UBICACION,
                   ui.ds_unid_int SECTOR,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,8) peso,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,9) ALTURA,
                   s.ds_servico SERVICIO
            FROM pre_med t1,
                 atendime t5,
                 prestador t4,
                 especialid e,
                 paciente t6,
                 leito l,
                 unid_int ui,
                 servico s
            WHERE
              t1.cd_pre_med IN
                (SELECT t3.cd_pre_med
                 FROM   itpre_med t3
                 WHERE  t3.cd_tip_esq = 'GAS'
                 and NVL(t3.sn_cancelado,'N') = 'N' -- Aquí se controla que se muestre las prescripciones que tienen al menos un item activo
                 )
              AND t1.cd_objeto IN (420)
              AND t1.fl_impresso = 'S'
              AND t1.cd_atendimento = t5.cd_atendimento
              AND t5.tp_atendimento = 'U'
              AND t5.cd_paciente = t6.cd_paciente
              AND t5.cd_especialid = e.cd_especialid (+)
              AND t5.cd_leito = l.cd_leito (+)
              AND t5.cd_prestador = t4.cd_prestador (+)
              AND l.cd_unid_int = ui.cd_unid_int (+)
              AND t5.cd_servico = s.cd_servico (+)
              AND TRUNC(t1.dh_impressao) >= TO_DATE('$fechaDesde', 'DD-MM-YYYY')
              AND TRUNC(t1.dh_impressao) <= TO_DATE('$fechaHasta', 'DD-MM-YYYY')
              order by t1.cd_pre_med desc ";
            } elseif ($typeFilter == '4') {

                $fechaDesde = $http->query->get('fechaDesde');
                $fechaHasta = $http->query->get('fechaHasta');

                # Devolver todos los resultados
                $sql = "SELECT t1.cd_pre_med, t5.tp_atendimento, t5.cd_paciente,
                   t6.nm_paciente,
                   TRUNC((MONTHS_BETWEEN(SYSDATE, t6.dt_nascimento)) / 12) || ' AÑOS' EDAD,
                   t1.cd_atendimento AT_MV,
                   e.ds_especialid ESPECIALIDAD,
                   t4.nm_prestador MED_MV,
                   t1.cd_pre_med,
                   TRUNC(t1.dh_impressao) fecha_pedido,
                   TO_CHAR(t1.dh_impressao, 'HH24:MI') hora_pedido,
                   l.ds_leito UBICACION,
                   ui.ds_unid_int SECTOR,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,8) peso,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,9) ALTURA,
                   s.ds_servico SERVICIO
            FROM pre_med t1,
                 atendime t5,
                 prestador t4,
                 especialid e,
                 paciente t6,
                 leito l,
                 unid_int ui,
                 servico s
            WHERE
              t1.cd_pre_med IN
                (SELECT t3.cd_pre_med
                 FROM   itpre_med t3
                 WHERE  t3.cd_tip_esq = 'GAS'
                 and NVL(t3.sn_cancelado,'N') = 'N' -- Aquí se controla que se muestre las prescripciones que tienen al menos un item activo
                 )
              AND t1.cd_objeto IN (420)
              AND t1.fl_impresso = 'S'
              AND t1.cd_atendimento = t5.cd_atendimento
              AND t5.tp_atendimento = 'I'
              AND t5.cd_paciente = t6.cd_paciente
              AND t5.cd_especialid = e.cd_especialid (+)
              AND t5.cd_leito = l.cd_leito (+)
              AND t5.cd_prestador = t4.cd_prestador (+)
              AND l.cd_unid_int = ui.cd_unid_int (+)
              AND t5.cd_servico = s.cd_servico (+)
              AND ui.ds_unid_int LIKE '%PB%'
              AND TRUNC(t1.dh_impressao) >= TO_DATE('$fechaDesde', 'DD-MM-YYYY')
              AND TRUNC(t1.dh_impressao) <= TO_DATE('$fechaHasta', 'DD-MM-YYYY')
              order by t1.cd_pre_med desc ";
            } elseif ($typeFilter == '5') {

                $fechaDesde = $http->query->get('fechaDesde');
                $fechaHasta = $http->query->get('fechaHasta');

                # Devolver todos los resultados
                $sql = "SELECT t1.cd_pre_med, t5.tp_atendimento, t5.cd_paciente,
                   t6.nm_paciente,
                   TRUNC((MONTHS_BETWEEN(SYSDATE, t6.dt_nascimento)) / 12) || ' AÑOS' EDAD,
                   t1.cd_atendimento AT_MV,
                   e.ds_especialid ESPECIALIDAD,
                   t4.nm_prestador MED_MV,
                   t1.cd_pre_med,
                   TRUNC(t1.dh_impressao) fecha_pedido,
                   TO_CHAR(t1.dh_impressao, 'HH24:MI') hora_pedido,
                   l.ds_leito UBICACION,
                   ui.ds_unid_int SECTOR,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,8) peso,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,9) ALTURA,
                   s.ds_servico SERVICIO
            FROM pre_med t1,
                 atendime t5,
                 prestador t4,
                 especialid e,
                 paciente t6,
                 leito l,
                 unid_int ui,
                 servico s
            WHERE
              t1.cd_pre_med IN
                (SELECT t3.cd_pre_med
                 FROM   itpre_med t3
                 WHERE  t3.cd_tip_esq = 'GAS'
                 and NVL(t3.sn_cancelado,'N') = 'N' -- Aquí se controla que se muestre las prescripciones que tienen al menos un item activo
                 )
              AND t1.cd_objeto IN (420)
              AND t1.fl_impresso = 'S'
              AND t1.cd_atendimento = t5.cd_atendimento
              AND t5.tp_atendimento = 'I'
              AND t5.cd_paciente = t6.cd_paciente
              AND t5.cd_especialid = e.cd_especialid (+)
              AND t5.cd_leito = l.cd_leito (+)
              AND t5.cd_prestador = t4.cd_prestador (+)
              AND l.cd_unid_int = ui.cd_unid_int (+)
              AND t5.cd_servico = s.cd_servico (+)
              AND ui.ds_unid_int LIKE '%PB%'
              AND TRUNC(t1.dh_impressao) >= TO_DATE('$fechaDesde', 'DD-MM-YYYY')
              AND TRUNC(t1.dh_impressao) <= TO_DATE('$fechaHasta', 'DD-MM-YYYY')
              order by t1.cd_pre_med desc ";
            } elseif ($typeFilter == '6') {

                $fechaDesde = $http->query->get('fechaDesde');
                $fechaHasta = $http->query->get('fechaHasta');

                # Devolver todos los resultados
                $sql = "SELECT t1.cd_pre_med, t5.tp_atendimento, t5.cd_paciente,
                   t6.nm_paciente,
                   TRUNC((MONTHS_BETWEEN(SYSDATE, t6.dt_nascimento)) / 12) || ' AÑOS' EDAD,
                   t1.cd_atendimento AT_MV,
                   e.ds_especialid ESPECIALIDAD,
                   t4.nm_prestador MED_MV,
                   t1.cd_pre_med,
                   TRUNC(t1.dh_impressao) fecha_pedido,
                   TO_CHAR(t1.dh_impressao, 'HH24:MI') hora_pedido,
                   l.ds_leito UBICACION,
                   ui.ds_unid_int SECTOR,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,8) peso,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,9) ALTURA,
                   s.ds_servico SERVICIO
            FROM pre_med t1,
                 atendime t5,
                 prestador t4,
                 especialid e,
                 paciente t6,
                 leito l,
                 unid_int ui,
                 servico s
            WHERE
              t1.cd_pre_med IN
                (SELECT t3.cd_pre_med
                 FROM   itpre_med t3
                 WHERE  t3.cd_tip_esq = 'GAS'
                 and NVL(t3.sn_cancelado,'N') = 'N' -- Aquí se controla que se muestre las prescripciones que tienen al menos un item activo
                 )
              AND t1.cd_objeto IN (420)
              AND t1.fl_impresso = 'S'
              AND t1.cd_atendimento = t5.cd_atendimento
              AND t5.tp_atendimento = 'I'
              AND t5.cd_paciente = t6.cd_paciente
              AND t5.cd_especialid = e.cd_especialid (+)
              AND t5.cd_leito = l.cd_leito (+)
              AND t5.cd_prestador = t4.cd_prestador (+)
              AND l.cd_unid_int = ui.cd_unid_int (+)
              AND t5.cd_servico = s.cd_servico (+)
              AND ui.ds_unid_int LIKE '%H1%'
              AND TRUNC(t1.dh_impressao) >= TO_DATE('$fechaDesde', 'DD-MM-YYYY')
              AND TRUNC(t1.dh_impressao) <= TO_DATE('$fechaHasta', 'DD-MM-YYYY')
              order by t1.cd_pre_med desc ";
            } elseif ($typeFilter == '7') {

                $fechaDesde = $http->query->get('fechaDesde');
                $fechaHasta = $http->query->get('fechaHasta');

                # Devolver todos los resultados
                $sql = "SELECT t1.cd_pre_med, t5.tp_atendimento, t5.cd_paciente,
                   t6.nm_paciente,
                   TRUNC((MONTHS_BETWEEN(SYSDATE, t6.dt_nascimento)) / 12) || ' AÑOS' EDAD,
                   t1.cd_atendimento AT_MV,
                   e.ds_especialid ESPECIALIDAD,
                   t4.nm_prestador MED_MV,
                   t1.cd_pre_med,
                   TRUNC(t1.dh_impressao) fecha_pedido,
                   TO_CHAR(t1.dh_impressao, 'HH24:MI') hora_pedido,
                   l.ds_leito UBICACION,
                   ui.ds_unid_int SECTOR,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,8) peso,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,9) ALTURA,
                   s.ds_servico SERVICIO
            FROM pre_med t1,
                 atendime t5,
                 prestador t4,
                 especialid e,
                 paciente t6,
                 leito l,
                 unid_int ui,
                 servico s
            WHERE
              t1.cd_pre_med IN
                (SELECT t3.cd_pre_med
                 FROM   itpre_med t3
                 WHERE  t3.cd_tip_esq = 'GAS'
                 and NVL(t3.sn_cancelado,'N') = 'N' -- Aquí se controla que se muestre las prescripciones que tienen al menos un item activo
                 )
              AND t1.cd_objeto IN (420)
              AND t1.fl_impresso = 'S'
              AND t1.cd_atendimento = t5.cd_atendimento
              AND t5.tp_atendimento = 'I'
              AND t5.cd_paciente = t6.cd_paciente
              AND t5.cd_especialid = e.cd_especialid (+)
              AND t5.cd_leito = l.cd_leito (+)
              AND t5.cd_prestador = t4.cd_prestador (+)
              AND l.cd_unid_int = ui.cd_unid_int (+)
              AND t5.cd_servico = s.cd_servico (+)
              AND ui.ds_unid_int LIKE '%H2%'
              AND TRUNC(t1.dh_impressao) >= TO_DATE('$fechaDesde', 'DD-MM-YYYY')
              AND TRUNC(t1.dh_impressao) <= TO_DATE('$fechaHasta', 'DD-MM-YYYY')
              order by t1.cd_pre_med desc ";
            } elseif ($typeFilter == '8') {

                $fechaDesde = $http->query->get('fechaDesde');
                $fechaHasta = $http->query->get('fechaHasta');

                # Devolver todos los resultados
                $sql = "SELECT t1.cd_pre_med, t5.tp_atendimento, t5.cd_paciente,
                   t6.nm_paciente,
                   TRUNC((MONTHS_BETWEEN(SYSDATE, t6.dt_nascimento)) / 12) || ' AÑOS' EDAD,
                   t1.cd_atendimento AT_MV,
                   e.ds_especialid ESPECIALIDAD,
                   t4.nm_prestador MED_MV,
                   t1.cd_pre_med,
                   TRUNC(t1.dh_impressao) fecha_pedido,
                   TO_CHAR(t1.dh_impressao, 'HH24:MI') hora_pedido,
                   l.ds_leito UBICACION,
                   ui.ds_unid_int SECTOR,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,8) peso,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,9) ALTURA,
                   s.ds_servico SERVICIO
            FROM pre_med t1,
                 atendime t5,
                 prestador t4,
                 especialid e,
                 paciente t6,
                 leito l,
                 unid_int ui,
                 servico s
            WHERE
              t1.cd_pre_med IN
                (SELECT t3.cd_pre_med
                 FROM   itpre_med t3
                 WHERE  t3.cd_tip_esq = 'GAS'
                 and NVL(t3.sn_cancelado,'N') = 'N' -- Aquí se controla que se muestre las prescripciones que tienen al menos un item activo
                 )
              AND t1.cd_objeto IN (420)
              AND t1.fl_impresso = 'S'
              AND t1.cd_atendimento = t5.cd_atendimento
              AND t5.tp_atendimento = 'I'
              AND t5.cd_paciente = t6.cd_paciente
              AND t5.cd_especialid = e.cd_especialid (+)
              AND t5.cd_leito = l.cd_leito (+)
              AND t5.cd_prestador = t4.cd_prestador (+)
              AND l.cd_unid_int = ui.cd_unid_int (+)
              AND t5.cd_servico = s.cd_servico (+)
              AND ui.ds_unid_int LIKE '%C2%'
              AND TRUNC(t1.dh_impressao) >= TO_DATE('$fechaDesde', 'DD-MM-YYYY')
              AND TRUNC(t1.dh_impressao) <= TO_DATE('$fechaHasta', 'DD-MM-YYYY')
              order by t1.cd_pre_med desc ";
            } elseif ($typeFilter == '9') {

                $fechaDesde = $http->query->get('fechaDesde');
                $fechaHasta = $http->query->get('fechaHasta');

                # Devolver todos los resultados
                $sql = "SELECT t1.cd_pre_med, t5.tp_atendimento, t5.cd_paciente,
                   t6.nm_paciente,
                   TRUNC((MONTHS_BETWEEN(SYSDATE, t6.dt_nascimento)) / 12) || ' AÑOS' EDAD,
                   t1.cd_atendimento AT_MV,
                   e.ds_especialid ESPECIALIDAD,
                   t4.nm_prestador MED_MV,
                   t1.cd_pre_med,
                   TRUNC(t1.dh_impressao) fecha_pedido,
                   TO_CHAR(t1.dh_impressao, 'HH24:MI') hora_pedido,
                   l.ds_leito UBICACION,
                   ui.ds_unid_int SECTOR,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,8) peso,
                   editor_custom.fun_signos_vitales_h(t5.cd_paciente,9) ALTURA,
                   s.ds_servico SERVICIO
            FROM pre_med t1,
                 atendime t5,
                 prestador t4,
                 especialid e,
                 paciente t6,
                 leito l,
                 unid_int ui,
                 servico s
            WHERE
              t1.cd_pre_med IN
                (SELECT t3.cd_pre_med
                 FROM   itpre_med t3
                 WHERE  t3.cd_tip_esq = 'GAS'
                 and NVL(t3.sn_cancelado,'N') = 'N' -- Aquí se controla que se muestre las prescripciones que tienen al menos un item activo
                 )
              AND t1.cd_objeto IN (420)
              AND t1.fl_impresso = 'S'
              AND t1.cd_atendimento = t5.cd_atendimento
              AND t5.tp_atendimento = 'I'
              AND t5.cd_paciente = t6.cd_paciente
              AND t5.cd_especialid = e.cd_especialid (+)
              AND t5.cd_leito = l.cd_leito (+)
              AND t5.cd_prestador = t4.cd_prestador (+)
              AND l.cd_unid_int = ui.cd_unid_int (+)
              AND t5.cd_servico = s.cd_servico (+)
              AND ui.ds_unid_int LIKE '%UNIDAD DE CUIDADOS INTENSIVOS%'
              AND TRUNC(t1.dh_impressao) >= TO_DATE('$fechaDesde', 'DD-MM-YYYY')
              AND TRUNC(t1.dh_impressao) <= TO_DATE('$fechaHasta', 'DD-MM-YYYY')
              order by t1.cd_pre_med desc ";
            } else {

                $fechaDesde = $http->query->get('fechaDesde');
                $fechaHasta = $http->query->get('fechaHasta');

                # Devolver todos los resultados
                $sql = "SELECT t1.cd_pre_med, t5.tp_atendimento, t5.cd_paciente,
                t6.nm_paciente,
                TRUNC((MONTHS_BETWEEN(SYSDATE, t6.dt_nascimento)) / 12) || ' AÑOS' EDAD,
                t1.cd_atendimento AT_MV,
                e.ds_especialid ESPECIALIDAD,
                t4.nm_prestador MED_MV,
                t1.cd_pre_med,
                TRUNC(t1.dh_impressao) fecha_pedido,
                TO_CHAR(t1.dh_impressao, 'HH24:MI') hora_pedido,
                l.ds_leito UBICACION,
                ui.ds_unid_int SECTOR,
                editor_custom.fun_signos_vitales_h(t5.cd_paciente,8) peso,
                editor_custom.fun_signos_vitales_h(t5.cd_paciente,9) ALTURA,
                s.ds_servico SERVICIO
         FROM pre_med t1,
              atendime t5,
              prestador t4,
              especialid e,
              paciente t6,
              leito l,
              unid_int ui,
              servico s
         WHERE
           t1.cd_pre_med IN
             (SELECT t3.cd_pre_med
              FROM   itpre_med t3
              WHERE  t3.cd_tip_esq = 'GAS'
              and NVL(t3.sn_cancelado,'N') = 'N'  -- Aquí se controla que se muestre las prescripciones que tienen al menos un item activo
              )
           AND t1.cd_objeto IN (420)
           AND t1.fl_impresso = 'S'
           AND t1.cd_atendimento = t5.cd_atendimento
           AND t5.tp_atendimento IN ('U','I')
           AND t5.cd_paciente = t6.cd_paciente
           AND t5.cd_especialid = e.cd_especialid (+)
           AND t5.cd_leito = l.cd_leito (+)
           AND t5.cd_prestador = t4.cd_prestador (+)
           AND l.cd_unid_int = ui.cd_unid_int (+)
           AND t5.cd_servico = s.cd_servico (+)
           AND TRUNC(t1.dh_impressao) >= TO_DATE('$fechaDesde', 'DD-MM-YYYY')
           AND TRUNC(t1.dh_impressao) <= TO_DATE('$fechaHasta', 'DD-MM-YYYY')
           order by t1.cd_pre_med desc ";
            }

            # Execute
            $stmt = $this->_conexion->query($sql);

            $this->_conexion->close();

            $data = $stmt->fetchAll();

            $res = array();

            foreach ($data as $key) {

                $sts = $this->getTR_HISTORIAL_TERAPIA($key['CD_PRE_MED']);
                $key['STS'] = count($sts);
                $res[] = $key;
            }

            return array(
                'status' => true,
                'data' => $res,
            );
        } catch (ModelsException $e) {
            return array('status' => false, 'data' => [], 'message' => $e->getMessage());
        }
    }


  public function getPedidoTRPlus($numPedido)
    {

        try {

            $detallePedido = $this->getDetallePedidoTRPlus($numPedido);

            if ($detallePedido) {

                $cd_pre_med = $detallePedido['CD_PRE_MED'];

                # Conectar base de datos
                $this->conectar_Oracle_MV();

                $this->setSpanishOracle();

                # Devolver todos los resultados
                $sql = "SELECT
    C.DS_TIP_PRESC EXAMEN,
    B.SN_CANCELADO STATUS,
    B.DS_ITPRE_MED OBS_EXAMEN,
    D.DS_TIP_FRE   FRECUENCIA,
    b.cd_itpre_med it_pre_med,
    editor_custom.fun_detalle_componentes_gas(b.cd_itpre_med) componente
FROM
    PRE_MED   A,
    ITPRE_MED B,
    TIP_PRESC C,
    TIP_FRE   D
WHERE
    A.CD_PRE_MED = '$cd_pre_med'
    AND --aquí sería como parámetro de entrada para query el numero de la prescripción.
    B.CD_TIP_ESQ = 'GAS'
    AND A.CD_PRE_MED = B.CD_PRE_MED
    AND B.CD_TIP_PRESC = C.CD_TIP_PRESC
    AND B.CD_TIP_FRE=D.CD_TIP_FRE(+)
    AND NVL(B.SN_CANCELADO, 'N') = 'N'  ";

                # Execute
                $stmt = $this->_conexion->query($sql);

                $this->_conexion->close();

                $dataPedido = $stmt->fetchAll();

                return array(
                    'status' => true,
                    'data' => $detallePedido,
                    'examenes' => $dataPedido,

                );
            } else {

                return array(
                    'status' => false,
                    'data' => [],
                    'examenes' => [],

                );
            }
        } catch (ModelsException $e) {
            return array('status' => false, 'data' => [], 'examenes' => [], 'message' => $e->getMessage());
        }
    }


     public function getFormularios_MV_005()
    {

        try {

            global $config, $http;

            $fecha = date('d-m-Y');

            $nhc = $http->request->get('numeroHistoriaClinica');

            $nhc = substr($nhc, 0, -2);

            $sql = " SELECT *
            FROM (
            SELECT b.*, ROWNUM AS NUM
            FROM (
                SELECT  at.cd_paciente AS NHCL, at.cd_atendimento as ADM, to_date(at.dt_atendimento, 'DD-MM-YYYY')  as FECHA_ADMISION, p.nm_paciente AS PACIENTE
                    from pw_editor_clinico a, -- enlace documento clinico-documento editor
                    pw_documento_clinico b, -- documento clinico
                    editor.editor_registro c, -- documento editor
                    paciente p, -- paciente
                    atendime at, -- atencion
                    prestador pr -- medico
                    where a.cd_documento=104
                    and a.cd_documento_clinico=b.cd_documento_clinico
                    and b.tp_status='FECHADO' and
                    a.cd_editor_registro=c.cd_registro and
                    b.cd_paciente=p.cd_paciente and
                    b.cd_atendimento=at.cd_atendimento and
                    b.cd_prestador=pr.cd_prestador and
                    to_date(at.dt_atendimento, 'DD-MM-YYYY') <= '$fecha' and
                    at.cd_paciente = '$nhc'
                    order by at.cd_atendimento  desc
            ) b
            WHERE ROWNUM <= 10
            )
            WHERE NUM > 0
            ";

            # Conectar base de datos
            $this->conectar_Oracle_MV();

            # Conectar base de datos
            $this->setSpanishOracle();

            # Execute
            $stmt = $this->_conexion->query($sql);

            $this->_conexion->close();

            $data = $stmt->fetch();

            if ($data === false) {
                throw new ModelsException('No existe información disponbile.');
            }

            $data = array($data);

            # NO EXITEN RESULTADOS
            $this->notResults($data);

            # Datos de usuario cuenta activa
            $resultados = array();

            foreach ($data as $k) {
                $resultados[] = $k;
            }

            # Ya no existe resultadso
            $this->notResults($resultados);

            # Devolver Información
            return array(
                'status' => true,
                'data' => $resultados,
            );
        } catch (ModelsException $e) {

            return array('status' => false, 'data' => [], 'message' => $e->getMessage());
        }
    }



     public function getFormulario()
    {

        try {

            global $config, $http;

            $nhcl = $http->query->get('nhcl');

            $adm = $this->getFormularios_MV_005($nhcl);

            # seteo de valores para paginacion
            $fecha = date('d-m-Y');

            $sql = "SELECT b.cd_documento_clinico, c.*, p.*, at.*
            from pw_editor_clinico a, -- enlace documento clinico-documento editor
            pw_documento_clinico b, -- documento clinico
            editor.editor_registro c, -- documento editor
            paciente p, -- paciente
            atendime at, -- atencion
            prestador pr -- medico
            where a.cd_documento=104
            and a.cd_documento_clinico=b.cd_documento_clinico
            and b.tp_status='FECHADO' and
            a.cd_editor_registro=c.cd_registro and
            b.cd_paciente=p.cd_paciente and
            b.cd_atendimento=at.cd_atendimento and
            b.cd_prestador=pr.cd_prestador
            and at.cd_paciente = '$nhcl' and at.cd_atendimento = '$adm'
            order by c.cd_registro desc";

            # Conectar base de datos
            $this->conectar_Oracle();

            # Conectar base de datos
            $this->setSpanishOracle();

            # Execute
            $stmt = $this->_conexion->query($sql);

            $this->_conexion->close();

            $data = $stmt->fetchAll();

            $res = array();

            foreach ($data as $k => $v) {

                $cuerpo = json_decode($v['CONTEUDO_CORPO'], true);

                $_t = time();

                $cuerpo['pageBody']['children'][0] = array('name' => 'cd_documento_clinico', 'answer' => $v['CD_DOCUMENTO_CLINICO']);

                $res[] = array(
                    'cd_documento_clinico' => $v['CD_DOCUMENTO_CLINICO'],
                    'contentKey' => $cuerpo['contentKey'],
                    'data' => $cuerpo['pageBody']['children'],
                );

            }

            return $res;

        } catch (ModelsException $e) {

            return array('status' => false, 'message' => $e->getMessage(), 'errorCode' => $e->getCode());

        }

    }
























?>