'use strict'

const uuid = require('uuid');

const UuidHook = module.exports = {}

/**
 * Hash using password as a hook.
 *
 * @method
 *
 * @param  {Object} userInstance
 * userInstance means modelInstance
 *
 * @return {void}
 */

UuidHook.setPrimaryKey = async (modelInstance) => {
    modelInstance.id = await uuid.v4()
}