import { EvaluationResult, Rule } from '../Rule';
import { get } from 'lodash';
import { Data } from '../Data';
import { RuleConfig } from '../config/RuleConfig';
import * as util from 'util';

/**
 * A generic validator used to validate simple rules, specified passing a validatorFunction to the constructor.
 */
export class GenericValidator implements Rule {
  private readonly config: RuleConfig;
  private readonly validatorFunction: (path: string) => boolean;
  private readonly defaultErrorMessage: string;

  /**
   * Constructor
   * @param config the rule configuration
   * @param validatorFunction the validatorFunction to be executed when this rule is checked
   * @param defaultErrorMessage the default error message to return in case of failure if a custom one is not specified.
   */
  constructor(
    config: RuleConfig,
    validatorFunction: (value: string) => boolean,
    defaultErrorMessage: string
  ) {
    this.config = config;
    this.validatorFunction = validatorFunction;
    this.defaultErrorMessage = defaultErrorMessage;
  }
  evaluate(path: string, data: Data): EvaluationResult {
    const value = get(data, path) as string;

    if (!this.validatorFunction(value)) {
      return {
        valid: false,
        field: path,
        message:
          this.config.errorMessage ||
          util.format(this.defaultErrorMessage, path),
      };
    }

    return { valid: true };
  }
}
