import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from './pessoas/pessoas.module';
import { ContatosModule } from './contatos/contatos.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { UnidadesModule } from './unidades/unidades.module';
import { MoradoresModule } from './moradores/moradores.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { FornecedoresModule } from './fornecedores/fornecedores.module';
import { VisitantesModule } from './visitantes/visitantes.module';
import { AreasComunsModule } from './areas_comuns/areas_comuns.module';
import { ReservasModule } from './reservas/reservas.module';
import { BoletosModule } from './boletos/boletos.module';
import { ComunicadosModule } from './comunicados/comunicados.module';
import { ContratosModule } from './contratos/contratos.module';
import { ContratosRhModule } from './contratos_rh/contratos_rh.module';
import { VisitasModule } from './visitas/visitas.module';
import { ContasPagarModule } from './contas_pagar/contas_pagar.module';
import { ContasReceberModule } from './contas_receber/contas_receber.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { RecebimentosModule } from './recebimentos/recebimentos.module';
import { ContaCorrenteModule } from './conta_corrente/conta_corrente.module';
import { MovContaCorrenteModule } from './mov_conta_corrente/mov_conta_corrente.module';
@Module({
 imports: [
 TypeOrmModule.forRoot({
 type: 'mysql',
 host: '127.0.0.1',
 port: 3306,
 username: 'root',
 password: 'laboratorio',
 database: 'DBCONDOMINIO',
 autoLoadEntities: true,
 synchronize: true,
 }),
 PessoasModule,
 ContatosModule,
 EnderecosModule,
 UnidadesModule,
 MoradoresModule,
 FuncionariosModule,
 FornecedoresModule,
 VisitantesModule,
 AreasComunsModule,
 ReservasModule,
 BoletosModule,
 ComunicadosModule,
 ContratosModule,
 ContratosRhModule,
 VisitasModule,
 ContasPagarModule,
 ContasReceberModule,
 PagamentosModule,
 RecebimentosModule,
 ContaCorrenteModule,
 MovContaCorrenteModule,
 ],
})
export class AppModule {}