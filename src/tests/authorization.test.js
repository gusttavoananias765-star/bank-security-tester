'use strict';

const assert = require('assert');
const { authorize } = require('../authorization');

describe('Role-Based Access Control', () => {
    const userRoles = {
        admin: 'admin',
        editor: 'editor',
        viewer: 'viewer',
    };

    it('should allow admin to access any resource', () => {
        const user = { role: userRoles.admin };
        const resource = 'sensitiveData';
        const result = authorize(user, resource);
        assert.strictEqual(result, true);
    });

    it('should allow editor to access editor resources', () => {
        const user = { role: userRoles.editor };
        const resource = 'editorData';
        const result = authorize(user, resource);
        assert.strictEqual(result, true);
    });

    it('should allow viewer to access viewer resources', () => {
        const user = { role: userRoles.viewer };
        const resource = 'viewerData';
        const result = authorize(user, resource);
        assert.strictEqual(result, true);
    });

    it('should deny editor access to sensitive data', () => {
        const user = { role: userRoles.editor };
        const resource = 'sensitiveData';
        const result = authorize(user, resource);
        assert.strictEqual(result, false);
    });

    it('should deny viewer access to editor resources', () => {
        const user = { role: userRoles.viewer };
        const resource = 'editorData';
        const result = authorize(user, resource);
        assert.strictEqual(result, false);
    });
});
