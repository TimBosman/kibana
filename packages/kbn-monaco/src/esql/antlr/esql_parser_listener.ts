// @ts-nocheck
// Generated from src/esql/antlr/esql_parser.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { DecimalLiteralContext } from "./esql_parser";
import { IntegerLiteralContext } from "./esql_parser";
import { SingleCommandQueryContext } from "./esql_parser";
import { CompositeQueryContext } from "./esql_parser";
import { SingleStatementContext } from "./esql_parser";
import { QueryContext } from "./esql_parser";
import { SourceCommandContext } from "./esql_parser";
import { ProcessingCommandContext } from "./esql_parser";
import { EnrichCommandContext } from "./esql_parser";
import { EnrichWithClauseContext } from "./esql_parser";
import { MvExpandCommandContext } from "./esql_parser";
import { WhereCommandContext } from "./esql_parser";
import { WhereBooleanExpressionContext } from "./esql_parser";
import { BooleanExpressionContext } from "./esql_parser";
import { RegexBooleanExpressionContext } from "./esql_parser";
import { ValueExpressionContext } from "./esql_parser";
import { ComparisonContext } from "./esql_parser";
import { MathFnContext } from "./esql_parser";
import { MathEvalFnContext } from "./esql_parser";
import { OperatorExpressionContext } from "./esql_parser";
import { PrimaryExpressionContext } from "./esql_parser";
import { RowCommandContext } from "./esql_parser";
import { FieldsContext } from "./esql_parser";
import { FieldContext } from "./esql_parser";
import { EnrichFieldIdentifierContext } from "./esql_parser";
import { UserVariableContext } from "./esql_parser";
import { FromCommandContext } from "./esql_parser";
import { MetadataContext } from "./esql_parser";
import { EvalCommandContext } from "./esql_parser";
import { StatsCommandContext } from "./esql_parser";
import { SourceIdentifierContext } from "./esql_parser";
import { EnrichIdentifierContext } from "./esql_parser";
import { FunctionExpressionArgumentContext } from "./esql_parser";
import { MathFunctionExpressionArgumentContext } from "./esql_parser";
import { QualifiedNameContext } from "./esql_parser";
import { QualifiedNamesContext } from "./esql_parser";
import { IdentifierContext } from "./esql_parser";
import { MathFunctionIdentifierContext } from "./esql_parser";
import { FunctionIdentifierContext } from "./esql_parser";
import { ConstantContext } from "./esql_parser";
import { NumericValueContext } from "./esql_parser";
import { LimitCommandContext } from "./esql_parser";
import { SortCommandContext } from "./esql_parser";
import { OrderExpressionContext } from "./esql_parser";
import { ProjectCommandContext } from "./esql_parser";
import { KeepCommandContext } from "./esql_parser";
import { DropCommandContext } from "./esql_parser";
import { RenameVariableContext } from "./esql_parser";
import { RenameCommandContext } from "./esql_parser";
import { RenameClauseContext } from "./esql_parser";
import { DissectCommandContext } from "./esql_parser";
import { GrokCommandContext } from "./esql_parser";
import { CommandOptionsContext } from "./esql_parser";
import { CommandOptionContext } from "./esql_parser";
import { BooleanValueContext } from "./esql_parser";
import { NumberContext } from "./esql_parser";
import { DecimalValueContext } from "./esql_parser";
import { IntegerValueContext } from "./esql_parser";
import { StringContext } from "./esql_parser";
import { ComparisonOperatorContext } from "./esql_parser";
import { ExplainCommandContext } from "./esql_parser";
import { SubqueryExpressionContext } from "./esql_parser";
import { ShowCommandContext } from "./esql_parser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `esql_parser`.
 */
export interface esql_parserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `decimalLiteral`
	 * labeled alternative in `esql_parser.number`.
	 * @param ctx the parse tree
	 */
	enterDecimalLiteral?: (ctx: DecimalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `decimalLiteral`
	 * labeled alternative in `esql_parser.number`.
	 * @param ctx the parse tree
	 */
	exitDecimalLiteral?: (ctx: DecimalLiteralContext) => void;

	/**
	 * Enter a parse tree produced by the `integerLiteral`
	 * labeled alternative in `esql_parser.number`.
	 * @param ctx the parse tree
	 */
	enterIntegerLiteral?: (ctx: IntegerLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `integerLiteral`
	 * labeled alternative in `esql_parser.number`.
	 * @param ctx the parse tree
	 */
	exitIntegerLiteral?: (ctx: IntegerLiteralContext) => void;

	/**
	 * Enter a parse tree produced by the `singleCommandQuery`
	 * labeled alternative in `esql_parser.query`.
	 * @param ctx the parse tree
	 */
	enterSingleCommandQuery?: (ctx: SingleCommandQueryContext) => void;
	/**
	 * Exit a parse tree produced by the `singleCommandQuery`
	 * labeled alternative in `esql_parser.query`.
	 * @param ctx the parse tree
	 */
	exitSingleCommandQuery?: (ctx: SingleCommandQueryContext) => void;

	/**
	 * Enter a parse tree produced by the `compositeQuery`
	 * labeled alternative in `esql_parser.query`.
	 * @param ctx the parse tree
	 */
	enterCompositeQuery?: (ctx: CompositeQueryContext) => void;
	/**
	 * Exit a parse tree produced by the `compositeQuery`
	 * labeled alternative in `esql_parser.query`.
	 * @param ctx the parse tree
	 */
	exitCompositeQuery?: (ctx: CompositeQueryContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.singleStatement`.
	 * @param ctx the parse tree
	 */
	enterSingleStatement?: (ctx: SingleStatementContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.singleStatement`.
	 * @param ctx the parse tree
	 */
	exitSingleStatement?: (ctx: SingleStatementContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.query`.
	 * @param ctx the parse tree
	 */
	enterQuery?: (ctx: QueryContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.query`.
	 * @param ctx the parse tree
	 */
	exitQuery?: (ctx: QueryContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.sourceCommand`.
	 * @param ctx the parse tree
	 */
	enterSourceCommand?: (ctx: SourceCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.sourceCommand`.
	 * @param ctx the parse tree
	 */
	exitSourceCommand?: (ctx: SourceCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.processingCommand`.
	 * @param ctx the parse tree
	 */
	enterProcessingCommand?: (ctx: ProcessingCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.processingCommand`.
	 * @param ctx the parse tree
	 */
	exitProcessingCommand?: (ctx: ProcessingCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.enrichCommand`.
	 * @param ctx the parse tree
	 */
	enterEnrichCommand?: (ctx: EnrichCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.enrichCommand`.
	 * @param ctx the parse tree
	 */
	exitEnrichCommand?: (ctx: EnrichCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.enrichWithClause`.
	 * @param ctx the parse tree
	 */
	enterEnrichWithClause?: (ctx: EnrichWithClauseContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.enrichWithClause`.
	 * @param ctx the parse tree
	 */
	exitEnrichWithClause?: (ctx: EnrichWithClauseContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.mvExpandCommand`.
	 * @param ctx the parse tree
	 */
	enterMvExpandCommand?: (ctx: MvExpandCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.mvExpandCommand`.
	 * @param ctx the parse tree
	 */
	exitMvExpandCommand?: (ctx: MvExpandCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.whereCommand`.
	 * @param ctx the parse tree
	 */
	enterWhereCommand?: (ctx: WhereCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.whereCommand`.
	 * @param ctx the parse tree
	 */
	exitWhereCommand?: (ctx: WhereCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.whereBooleanExpression`.
	 * @param ctx the parse tree
	 */
	enterWhereBooleanExpression?: (ctx: WhereBooleanExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.whereBooleanExpression`.
	 * @param ctx the parse tree
	 */
	exitWhereBooleanExpression?: (ctx: WhereBooleanExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.booleanExpression`.
	 * @param ctx the parse tree
	 */
	enterBooleanExpression?: (ctx: BooleanExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.booleanExpression`.
	 * @param ctx the parse tree
	 */
	exitBooleanExpression?: (ctx: BooleanExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.regexBooleanExpression`.
	 * @param ctx the parse tree
	 */
	enterRegexBooleanExpression?: (ctx: RegexBooleanExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.regexBooleanExpression`.
	 * @param ctx the parse tree
	 */
	exitRegexBooleanExpression?: (ctx: RegexBooleanExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.valueExpression`.
	 * @param ctx the parse tree
	 */
	enterValueExpression?: (ctx: ValueExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.valueExpression`.
	 * @param ctx the parse tree
	 */
	exitValueExpression?: (ctx: ValueExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.comparison`.
	 * @param ctx the parse tree
	 */
	enterComparison?: (ctx: ComparisonContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.comparison`.
	 * @param ctx the parse tree
	 */
	exitComparison?: (ctx: ComparisonContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.mathFn`.
	 * @param ctx the parse tree
	 */
	enterMathFn?: (ctx: MathFnContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.mathFn`.
	 * @param ctx the parse tree
	 */
	exitMathFn?: (ctx: MathFnContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.mathEvalFn`.
	 * @param ctx the parse tree
	 */
	enterMathEvalFn?: (ctx: MathEvalFnContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.mathEvalFn`.
	 * @param ctx the parse tree
	 */
	exitMathEvalFn?: (ctx: MathEvalFnContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.operatorExpression`.
	 * @param ctx the parse tree
	 */
	enterOperatorExpression?: (ctx: OperatorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.operatorExpression`.
	 * @param ctx the parse tree
	 */
	exitOperatorExpression?: (ctx: OperatorExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.primaryExpression`.
	 * @param ctx the parse tree
	 */
	enterPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.primaryExpression`.
	 * @param ctx the parse tree
	 */
	exitPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.rowCommand`.
	 * @param ctx the parse tree
	 */
	enterRowCommand?: (ctx: RowCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.rowCommand`.
	 * @param ctx the parse tree
	 */
	exitRowCommand?: (ctx: RowCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.fields`.
	 * @param ctx the parse tree
	 */
	enterFields?: (ctx: FieldsContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.fields`.
	 * @param ctx the parse tree
	 */
	exitFields?: (ctx: FieldsContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.field`.
	 * @param ctx the parse tree
	 */
	enterField?: (ctx: FieldContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.field`.
	 * @param ctx the parse tree
	 */
	exitField?: (ctx: FieldContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.enrichFieldIdentifier`.
	 * @param ctx the parse tree
	 */
	enterEnrichFieldIdentifier?: (ctx: EnrichFieldIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.enrichFieldIdentifier`.
	 * @param ctx the parse tree
	 */
	exitEnrichFieldIdentifier?: (ctx: EnrichFieldIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.userVariable`.
	 * @param ctx the parse tree
	 */
	enterUserVariable?: (ctx: UserVariableContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.userVariable`.
	 * @param ctx the parse tree
	 */
	exitUserVariable?: (ctx: UserVariableContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.fromCommand`.
	 * @param ctx the parse tree
	 */
	enterFromCommand?: (ctx: FromCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.fromCommand`.
	 * @param ctx the parse tree
	 */
	exitFromCommand?: (ctx: FromCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.metadata`.
	 * @param ctx the parse tree
	 */
	enterMetadata?: (ctx: MetadataContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.metadata`.
	 * @param ctx the parse tree
	 */
	exitMetadata?: (ctx: MetadataContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.evalCommand`.
	 * @param ctx the parse tree
	 */
	enterEvalCommand?: (ctx: EvalCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.evalCommand`.
	 * @param ctx the parse tree
	 */
	exitEvalCommand?: (ctx: EvalCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.statsCommand`.
	 * @param ctx the parse tree
	 */
	enterStatsCommand?: (ctx: StatsCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.statsCommand`.
	 * @param ctx the parse tree
	 */
	exitStatsCommand?: (ctx: StatsCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.sourceIdentifier`.
	 * @param ctx the parse tree
	 */
	enterSourceIdentifier?: (ctx: SourceIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.sourceIdentifier`.
	 * @param ctx the parse tree
	 */
	exitSourceIdentifier?: (ctx: SourceIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.enrichIdentifier`.
	 * @param ctx the parse tree
	 */
	enterEnrichIdentifier?: (ctx: EnrichIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.enrichIdentifier`.
	 * @param ctx the parse tree
	 */
	exitEnrichIdentifier?: (ctx: EnrichIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.functionExpressionArgument`.
	 * @param ctx the parse tree
	 */
	enterFunctionExpressionArgument?: (ctx: FunctionExpressionArgumentContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.functionExpressionArgument`.
	 * @param ctx the parse tree
	 */
	exitFunctionExpressionArgument?: (ctx: FunctionExpressionArgumentContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.mathFunctionExpressionArgument`.
	 * @param ctx the parse tree
	 */
	enterMathFunctionExpressionArgument?: (ctx: MathFunctionExpressionArgumentContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.mathFunctionExpressionArgument`.
	 * @param ctx the parse tree
	 */
	exitMathFunctionExpressionArgument?: (ctx: MathFunctionExpressionArgumentContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.qualifiedName`.
	 * @param ctx the parse tree
	 */
	enterQualifiedName?: (ctx: QualifiedNameContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.qualifiedName`.
	 * @param ctx the parse tree
	 */
	exitQualifiedName?: (ctx: QualifiedNameContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.qualifiedNames`.
	 * @param ctx the parse tree
	 */
	enterQualifiedNames?: (ctx: QualifiedNamesContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.qualifiedNames`.
	 * @param ctx the parse tree
	 */
	exitQualifiedNames?: (ctx: QualifiedNamesContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.mathFunctionIdentifier`.
	 * @param ctx the parse tree
	 */
	enterMathFunctionIdentifier?: (ctx: MathFunctionIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.mathFunctionIdentifier`.
	 * @param ctx the parse tree
	 */
	exitMathFunctionIdentifier?: (ctx: MathFunctionIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.functionIdentifier`.
	 * @param ctx the parse tree
	 */
	enterFunctionIdentifier?: (ctx: FunctionIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.functionIdentifier`.
	 * @param ctx the parse tree
	 */
	exitFunctionIdentifier?: (ctx: FunctionIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.constant`.
	 * @param ctx the parse tree
	 */
	enterConstant?: (ctx: ConstantContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.constant`.
	 * @param ctx the parse tree
	 */
	exitConstant?: (ctx: ConstantContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.numericValue`.
	 * @param ctx the parse tree
	 */
	enterNumericValue?: (ctx: NumericValueContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.numericValue`.
	 * @param ctx the parse tree
	 */
	exitNumericValue?: (ctx: NumericValueContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.limitCommand`.
	 * @param ctx the parse tree
	 */
	enterLimitCommand?: (ctx: LimitCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.limitCommand`.
	 * @param ctx the parse tree
	 */
	exitLimitCommand?: (ctx: LimitCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.sortCommand`.
	 * @param ctx the parse tree
	 */
	enterSortCommand?: (ctx: SortCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.sortCommand`.
	 * @param ctx the parse tree
	 */
	exitSortCommand?: (ctx: SortCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.orderExpression`.
	 * @param ctx the parse tree
	 */
	enterOrderExpression?: (ctx: OrderExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.orderExpression`.
	 * @param ctx the parse tree
	 */
	exitOrderExpression?: (ctx: OrderExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.projectCommand`.
	 * @param ctx the parse tree
	 */
	enterProjectCommand?: (ctx: ProjectCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.projectCommand`.
	 * @param ctx the parse tree
	 */
	exitProjectCommand?: (ctx: ProjectCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.keepCommand`.
	 * @param ctx the parse tree
	 */
	enterKeepCommand?: (ctx: KeepCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.keepCommand`.
	 * @param ctx the parse tree
	 */
	exitKeepCommand?: (ctx: KeepCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.dropCommand`.
	 * @param ctx the parse tree
	 */
	enterDropCommand?: (ctx: DropCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.dropCommand`.
	 * @param ctx the parse tree
	 */
	exitDropCommand?: (ctx: DropCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.renameVariable`.
	 * @param ctx the parse tree
	 */
	enterRenameVariable?: (ctx: RenameVariableContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.renameVariable`.
	 * @param ctx the parse tree
	 */
	exitRenameVariable?: (ctx: RenameVariableContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.renameCommand`.
	 * @param ctx the parse tree
	 */
	enterRenameCommand?: (ctx: RenameCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.renameCommand`.
	 * @param ctx the parse tree
	 */
	exitRenameCommand?: (ctx: RenameCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.renameClause`.
	 * @param ctx the parse tree
	 */
	enterRenameClause?: (ctx: RenameClauseContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.renameClause`.
	 * @param ctx the parse tree
	 */
	exitRenameClause?: (ctx: RenameClauseContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.dissectCommand`.
	 * @param ctx the parse tree
	 */
	enterDissectCommand?: (ctx: DissectCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.dissectCommand`.
	 * @param ctx the parse tree
	 */
	exitDissectCommand?: (ctx: DissectCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.grokCommand`.
	 * @param ctx the parse tree
	 */
	enterGrokCommand?: (ctx: GrokCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.grokCommand`.
	 * @param ctx the parse tree
	 */
	exitGrokCommand?: (ctx: GrokCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.commandOptions`.
	 * @param ctx the parse tree
	 */
	enterCommandOptions?: (ctx: CommandOptionsContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.commandOptions`.
	 * @param ctx the parse tree
	 */
	exitCommandOptions?: (ctx: CommandOptionsContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.commandOption`.
	 * @param ctx the parse tree
	 */
	enterCommandOption?: (ctx: CommandOptionContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.commandOption`.
	 * @param ctx the parse tree
	 */
	exitCommandOption?: (ctx: CommandOptionContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.booleanValue`.
	 * @param ctx the parse tree
	 */
	enterBooleanValue?: (ctx: BooleanValueContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.booleanValue`.
	 * @param ctx the parse tree
	 */
	exitBooleanValue?: (ctx: BooleanValueContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.number`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.number`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.decimalValue`.
	 * @param ctx the parse tree
	 */
	enterDecimalValue?: (ctx: DecimalValueContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.decimalValue`.
	 * @param ctx the parse tree
	 */
	exitDecimalValue?: (ctx: DecimalValueContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.integerValue`.
	 * @param ctx the parse tree
	 */
	enterIntegerValue?: (ctx: IntegerValueContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.integerValue`.
	 * @param ctx the parse tree
	 */
	exitIntegerValue?: (ctx: IntegerValueContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.string`.
	 * @param ctx the parse tree
	 */
	enterString?: (ctx: StringContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.string`.
	 * @param ctx the parse tree
	 */
	exitString?: (ctx: StringContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.comparisonOperator`.
	 * @param ctx the parse tree
	 */
	enterComparisonOperator?: (ctx: ComparisonOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.comparisonOperator`.
	 * @param ctx the parse tree
	 */
	exitComparisonOperator?: (ctx: ComparisonOperatorContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.explainCommand`.
	 * @param ctx the parse tree
	 */
	enterExplainCommand?: (ctx: ExplainCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.explainCommand`.
	 * @param ctx the parse tree
	 */
	exitExplainCommand?: (ctx: ExplainCommandContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.subqueryExpression`.
	 * @param ctx the parse tree
	 */
	enterSubqueryExpression?: (ctx: SubqueryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.subqueryExpression`.
	 * @param ctx the parse tree
	 */
	exitSubqueryExpression?: (ctx: SubqueryExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `esql_parser.showCommand`.
	 * @param ctx the parse tree
	 */
	enterShowCommand?: (ctx: ShowCommandContext) => void;
	/**
	 * Exit a parse tree produced by `esql_parser.showCommand`.
	 * @param ctx the parse tree
	 */
	exitShowCommand?: (ctx: ShowCommandContext) => void;
}

