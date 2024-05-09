
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function split_css_unit(value) {
        const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
        return split ? [parseFloat(split[1]), split[2] || 'px'] : [value, 'px'];
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function self(fn) {
        return function (event) {
            // @ts-ignore
            if (event.target === this)
                fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        const options = { direction: 'in' };
        let config = fn(node, params, options);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config(options);
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        const options = { direction: 'both' };
        let config = fn(node, params, options);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config(options);
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        const updates = [];
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                // defer updates until all the DOM shuffling is done
                updates.push(() => block.p(child_ctx, dirty));
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        run_all(updates);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        const [xValue, xUnit] = split_css_unit(x);
        const [yValue, yUnit] = split_css_unit(y);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${target_opacity - (od * u)}`
        };
    }
    function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const sd = 1 - start;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
        };
    }

    /* src/Modal.svelte generated by Svelte v3.59.2 */
    const file$2 = "src/Modal.svelte";

    function create_fragment$2(ctx) {
    	let dialog_1;
    	let div;
    	let button;
    	let i;
    	let t;
    	let div_transition;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			dialog_1 = element("dialog");
    			div = element("div");
    			button = element("button");
    			i = element("i");
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(i, "class", "bi bi-x");
    			add_location(i, file$2, 24, 12, 769);
    			button.autofocus = true;
    			attr_dev(button, "class", "svelte-15q6hff");
    			add_location(button, file$2, 23, 2, 702);
    			attr_dev(div, "class", "svelte-15q6hff");
    			add_location(div, file$2, 21, 1, 612);
    			attr_dev(dialog_1, "class", "svelte-15q6hff");
    			add_location(dialog_1, file$2, 15, 0, 444);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dialog_1, anchor);
    			append_dev(dialog_1, div);
    			append_dev(div, button);
    			append_dev(button, i);
    			append_dev(div, t);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*dialog_1_binding*/ ctx[6](dialog_1);
    			current = true;
    			button.focus();

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", /*click_handler_1*/ ctx[5], false, false, false, false),
    					listen_dev(div, "click", stop_propagation(/*click_handler*/ ctx[4]), false, false, true, false),
    					listen_dev(dialog_1, "close", /*close_handler*/ ctx[7], false, false, false, false),
    					listen_dev(dialog_1, "click", self(/*click_handler_2*/ ctx[8]), false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (!current) return;
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dialog_1);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div_transition) div_transition.end();
    			/*dialog_1_binding*/ ctx[6](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Modal', slots, ['default']);
    	let { showModal } = $$props;
    	let dialog; // HTMLDialogElement
    	const dispatch = createEventDispatcher();

    	$$self.$$.on_mount.push(function () {
    		if (showModal === undefined && !('showModal' in $$props || $$self.$$.bound[$$self.$$.props['showModal']])) {
    			console.warn("<Modal> was created without expected prop 'showModal'");
    		}
    	});

    	const writable_props = ['showModal'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	const click_handler_1 = () => {
    		dialog.close();
    	};

    	function dialog_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			dialog = $$value;
    			$$invalidate(1, dialog);
    		});
    	}

    	const close_handler = () => $$invalidate(0, showModal = false);
    	const click_handler_2 = () => dialog.close();

    	$$self.$$set = $$props => {
    		if ('showModal' in $$props) $$invalidate(0, showModal = $$props.showModal);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		showModal,
    		fade,
    		createEventDispatcher,
    		onDestroy,
    		dialog,
    		dispatch
    	});

    	$$self.$inject_state = $$props => {
    		if ('showModal' in $$props) $$invalidate(0, showModal = $$props.showModal);
    		if ('dialog' in $$props) $$invalidate(1, dialog = $$props.dialog);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*showModal*/ 1) {
    			if (!showModal) dispatch('closeModal');
    		}

    		if ($$self.$$.dirty & /*dialog, showModal*/ 3) {
    			if (dialog && showModal) dialog.showModal();
    		}
    	};

    	return [
    		showModal,
    		dialog,
    		$$scope,
    		slots,
    		click_handler,
    		click_handler_1,
    		dialog_1_binding,
    		close_handler,
    		click_handler_2
    	];
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { showModal: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get showModal() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showModal(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    let rankNames = {
        0.1: "🥚Egg",
        0.25: "🐸Frog",
        0.4: "🐼Panda",
        0.6: "😸Cat",
        0.8: "🦧Orangutang",
        1: "🧑🏿‍🌾Human",
    };
    function getWordScore(word, game) {
        if (word.length == 4)
            return 1;
        if (game.pangrams.includes(word))
            return word.length + 7;
        return word.length;
    }
    function getRank(points, game) {
        if (points === game.maxScore) {
            return ["🤖Robot", 0];
        }
        for (let percentage of Object.keys(rankNames).sort()) {
            let rankName = rankNames[percentage];
            if (points < Math.floor(parseFloat(percentage) * game.maxScore)) {
                return [rankName, Math.floor(parseFloat(percentage) * game.maxScore) - points];
            }
        }
        return [rankNames[1] || rankNames['1'], 0];
    }

    /* src/Progress.svelte generated by Svelte v3.59.2 */
    const file$1 = "src/Progress.svelte";

    // (14:8) {:else}
    function create_else_block$1(ctx) {
    	let span;
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("(");
    			t1 = text(/*pointsUntilNextRank*/ ctx[3]);
    			t2 = text(" to next)");
    			set_style(span, "font-size", "0.75em");
    			set_style(span, "color", `grey`);
    			add_location(span, file$1, 14, 8, 435);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pointsUntilNextRank*/ 8) set_data_dev(t1, /*pointsUntilNextRank*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(14:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (12:8) {#if score == game.maxScore}
    function create_if_block$1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "🎉";
    			attr_dev(span, "class", "green svelte-13ygdni");
    			add_location(span, file$1, 12, 12, 381);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(12:8) {#if score == game.maxScore}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div7;
    	let div0;
    	let t0;
    	let t1;
    	let t2;
    	let div6;
    	let div1;
    	let span0;
    	let t3;
    	let t4;
    	let t5_value = /*game*/ ctx[1].maxScore + "";
    	let t5;
    	let t6;
    	let t7;
    	let div2;
    	let t8;
    	let div3;
    	let span1;
    	let t9_value = (/*foundWords*/ ctx[0].length || 0) + "";
    	let t9;
    	let t10;
    	let t11_value = /*game*/ ctx[1].validWords.length + "";
    	let t11;
    	let t12;
    	let t13;
    	let div4;
    	let t14;
    	let div5;
    	let span2;
    	let t15_value = /*foundPangrams*/ ctx[5].length + "";
    	let t15;
    	let t16;
    	let t17_value = /*game*/ ctx[1].pangrams.length + "";
    	let t17;
    	let t18;

    	function select_block_type(ctx, dirty) {
    		if (/*score*/ ctx[2] == /*game*/ ctx[1].maxScore) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div0 = element("div");
    			t0 = text(/*rankName*/ ctx[4]);
    			t1 = space();
    			if_block.c();
    			t2 = space();
    			div6 = element("div");
    			div1 = element("div");
    			span0 = element("span");
    			t3 = text(/*score*/ ctx[2]);
    			t4 = text("/");
    			t5 = text(t5_value);
    			t6 = text(" points");
    			t7 = space();
    			div2 = element("div");
    			t8 = space();
    			div3 = element("div");
    			span1 = element("span");
    			t9 = text(t9_value);
    			t10 = text("/");
    			t11 = text(t11_value);
    			t12 = text(" words");
    			t13 = space();
    			div4 = element("div");
    			t14 = space();
    			div5 = element("div");
    			span2 = element("span");
    			t15 = text(t15_value);
    			t16 = text("/");
    			t17 = text(t17_value);
    			t18 = text(" pangrams");
    			attr_dev(div0, "class", "top svelte-13ygdni");
    			add_location(div0, file$1, 9, 4, 294);
    			attr_dev(span0, "class", "green svelte-13ygdni");
    			add_location(span0, file$1, 21, 13, 705);
    			add_location(div1, file$1, 21, 8, 700);
    			attr_dev(div2, "class", "bar svelte-13ygdni");
    			add_location(div2, file$1, 22, 8, 777);
    			attr_dev(span1, "class", "green svelte-13ygdni");
    			add_location(span1, file$1, 23, 13, 814);
    			add_location(div3, file$1, 23, 8, 809);
    			attr_dev(div4, "class", "bar svelte-13ygdni");
    			add_location(div4, file$1, 27, 8, 1077);
    			attr_dev(span2, "class", "green svelte-13ygdni");
    			add_location(span2, file$1, 28, 13, 1114);
    			add_location(div5, file$1, 28, 8, 1109);
    			attr_dev(div6, "class", "bottom svelte-13ygdni");
    			add_location(div6, file$1, 20, 4, 671);
    			attr_dev(div7, "class", "container svelte-13ygdni");
    			add_location(div7, file$1, 8, 0, 266);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			if_block.m(div0, null);
    			append_dev(div7, t2);
    			append_dev(div7, div6);
    			append_dev(div6, div1);
    			append_dev(div1, span0);
    			append_dev(span0, t3);
    			append_dev(div1, t4);
    			append_dev(div1, t5);
    			append_dev(div1, t6);
    			append_dev(div6, t7);
    			append_dev(div6, div2);
    			append_dev(div6, t8);
    			append_dev(div6, div3);
    			append_dev(div3, span1);
    			append_dev(span1, t9);
    			append_dev(div3, t10);
    			append_dev(div3, t11);
    			append_dev(div3, t12);
    			append_dev(div6, t13);
    			append_dev(div6, div4);
    			append_dev(div6, t14);
    			append_dev(div6, div5);
    			append_dev(div5, span2);
    			append_dev(span2, t15);
    			append_dev(div5, t16);
    			append_dev(div5, t17);
    			append_dev(div5, t18);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*rankName*/ 16) set_data_dev(t0, /*rankName*/ ctx[4]);

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			}

    			if (dirty & /*score*/ 4) set_data_dev(t3, /*score*/ ctx[2]);
    			if (dirty & /*game*/ 2 && t5_value !== (t5_value = /*game*/ ctx[1].maxScore + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*foundWords*/ 1 && t9_value !== (t9_value = (/*foundWords*/ ctx[0].length || 0) + "")) set_data_dev(t9, t9_value);
    			if (dirty & /*game*/ 2 && t11_value !== (t11_value = /*game*/ ctx[1].validWords.length + "")) set_data_dev(t11, t11_value);
    			if (dirty & /*foundPangrams*/ 32 && t15_value !== (t15_value = /*foundPangrams*/ ctx[5].length + "")) set_data_dev(t15, t15_value);
    			if (dirty & /*game*/ 2 && t17_value !== (t17_value = /*game*/ ctx[1].pangrams.length + "")) set_data_dev(t17, t17_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let foundPangrams;
    	let rankName;
    	let pointsUntilNextRank;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Progress', slots, []);
    	let { foundWords = [] } = $$props;
    	let { game } = $$props;
    	let { score } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (game === undefined && !('game' in $$props || $$self.$$.bound[$$self.$$.props['game']])) {
    			console.warn("<Progress> was created without expected prop 'game'");
    		}

    		if (score === undefined && !('score' in $$props || $$self.$$.bound[$$self.$$.props['score']])) {
    			console.warn("<Progress> was created without expected prop 'score'");
    		}
    	});

    	const writable_props = ['foundWords', 'game', 'score'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Progress> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('foundWords' in $$props) $$invalidate(0, foundWords = $$props.foundWords);
    		if ('game' in $$props) $$invalidate(1, game = $$props.game);
    		if ('score' in $$props) $$invalidate(2, score = $$props.score);
    	};

    	$$self.$capture_state = () => ({
    		foundWords,
    		game,
    		score,
    		getRank,
    		pointsUntilNextRank,
    		rankName,
    		foundPangrams
    	});

    	$$self.$inject_state = $$props => {
    		if ('foundWords' in $$props) $$invalidate(0, foundWords = $$props.foundWords);
    		if ('game' in $$props) $$invalidate(1, game = $$props.game);
    		if ('score' in $$props) $$invalidate(2, score = $$props.score);
    		if ('pointsUntilNextRank' in $$props) $$invalidate(3, pointsUntilNextRank = $$props.pointsUntilNextRank);
    		if ('rankName' in $$props) $$invalidate(4, rankName = $$props.rankName);
    		if ('foundPangrams' in $$props) $$invalidate(5, foundPangrams = $$props.foundPangrams);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*foundWords, game*/ 3) {
    			$$invalidate(5, foundPangrams = foundWords.filter(word => game.pangrams.includes(word)));
    		}

    		if ($$self.$$.dirty & /*score, game*/ 6) {
    			$$invalidate(4, [rankName, pointsUntilNextRank] = getRank(score, game), rankName, (($$invalidate(3, pointsUntilNextRank), $$invalidate(2, score)), $$invalidate(1, game)));
    		}
    	};

    	return [foundWords, game, score, pointsUntilNextRank, rankName, foundPangrams];
    }

    class Progress extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { foundWords: 0, game: 1, score: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Progress",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get foundWords() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set foundWords(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get game() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set game(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get score() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set score(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.59.2 */

    const { console: console_1, document: document_1 } = globals;
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[26] = list[i];
    	child_ctx[28] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[26] = list[i];
    	child_ctx[28] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[30] = list[i];
    	child_ctx[28] = i;
    	return child_ctx;
    }

    function get_context_1(ctx) {
    	const constants_0 = /*game*/ ctx[0].validWords.filter(w => !/*foundWords*/ ctx[3].includes(w)).sort();
    	ctx[32] = constants_0;
    	const constants_1 = ["🧑🏿‍🌾Human", "🤖Robot"].includes(getRank(/*score*/ ctx[8], /*game*/ ctx[0])[0]);
    	ctx[33] = constants_1;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[30] = list[i];
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[36] = list[i];
    	child_ctx[38] = i;
    	return child_ctx;
    }

    function get_context(ctx) {
    	const constants_0 = /*foundWords*/ ctx[3].reduce((acc, word) => acc + getWordScore(word, /*game*/ ctx[0]), 0);
    	ctx[8] = constants_0;
    }

    function get_each_context_5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[30] = list[i];
    	return child_ctx;
    }

    function get_each_context_6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[30] = list[i];
    	return child_ctx;
    }

    // (143:1) {#if game}
    function create_if_block(ctx) {
    	let modal;
    	let updating_showModal;
    	let t0;
    	let t1;
    	let t2;
    	let div0;
    	let progress;
    	let t3;
    	let button0;
    	let i0;
    	let t4;
    	let t5;
    	let div6;
    	let div2;
    	let div1;
    	let each_blocks_1 = [];
    	let each0_lookup = new Map();
    	let t6;
    	let t7;
    	let div3;
    	let t8;
    	let div4;
    	let svg;
    	let path;
    	let text_1;
    	let t9_value = /*game*/ ctx[0].center.toUpperCase() + "";
    	let t9;
    	let svg_transition;
    	let t10;
    	let each_blocks = [];
    	let each1_lookup = new Map();
    	let t11;
    	let div5;
    	let button1;
    	let t13;
    	let button2;
    	let i1;
    	let t14;
    	let button3;
    	let current;
    	let mounted;
    	let dispose;

    	function modal_showModal_binding(value) {
    		/*modal_showModal_binding*/ ctx[15](value);
    	}

    	let modal_props = {
    		$$slots: { default: [create_default_slot_2] },
    		$$scope: { ctx }
    	};

    	if (/*showFoundWordsModal*/ ctx[4] !== void 0) {
    		modal_props.showModal = /*showFoundWordsModal*/ ctx[4];
    	}

    	modal = new Modal({ props: modal_props, $$inline: true });
    	binding_callbacks.push(() => bind(modal, 'showModal', modal_showModal_binding));
    	let if_block0 = /*showGameOverModal*/ ctx[5] && create_if_block_6(ctx);
    	let if_block1 = /*showHintsModal*/ ctx[6] && create_if_block_4(ctx);

    	progress = new Progress({
    			props: {
    				foundWords: /*foundWords*/ ctx[3],
    				game: /*game*/ ctx[0],
    				score: /*score*/ ctx[8]
    			},
    			$$inline: true
    		});

    	let each_value_2 = /*foundWords*/ ctx[3];
    	validate_each_argument(each_value_2);
    	const get_key = ctx => /*word*/ ctx[30];
    	validate_each_keys(ctx, each_value_2, get_each_context_2, get_key);

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		let child_ctx = get_each_context_2(ctx, each_value_2, i);
    		let key = get_key(child_ctx);
    		each0_lookup.set(key, each_blocks_1[i] = create_each_block_2(key, child_ctx));
    	}

    	let if_block2 = /*foundWords*/ ctx[3].length > 0 && create_if_block_3(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*feedback*/ ctx[7].message) return create_if_block_1;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block3 = current_block_type(ctx);
    	let each_value = /*game*/ ctx[0].outer;
    	validate_each_argument(each_value);
    	const get_key_1 = ctx => /*letter*/ ctx[26];
    	validate_each_keys(ctx, each_value, get_each_context, get_key_1);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key_1(child_ctx);
    		each1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			div0 = element("div");
    			create_component(progress.$$.fragment);
    			t3 = space();
    			button0 = element("button");
    			i0 = element("i");
    			t4 = text(" Hints");
    			t5 = space();
    			div6 = element("div");
    			div2 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t6 = space();
    			if (if_block2) if_block2.c();
    			t7 = space();
    			div3 = element("div");
    			if_block3.c();
    			t8 = space();
    			div4 = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			text_1 = svg_element("text");
    			t9 = text(t9_value);
    			t10 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t11 = space();
    			div5 = element("div");
    			button1 = element("button");
    			button1.textContent = "Delete";
    			t13 = space();
    			button2 = element("button");
    			i1 = element("i");
    			t14 = space();
    			button3 = element("button");
    			button3.textContent = "Enter";

    			attr_dev(i0, "class", "bi " + (/*hintsAreUnlocked*/ ctx[14]()
    			? 'bi-lightbulb-fill'
    			: 'bi-lock-fill') + " svelte-1jw2xiu");

    			add_location(i0, file, 215, 3, 6499);
    			attr_dev(button0, "class", "hints-btn svelte-1jw2xiu");
    			add_location(button0, file, 211, 2, 6317);
    			attr_dev(div0, "class", "top-bar svelte-1jw2xiu");
    			add_location(div0, file, 202, 1, 6200);
    			attr_dev(div1, "class", "found-preview-words svelte-1jw2xiu");
    			add_location(div1, file, 222, 3, 6665);
    			attr_dev(div2, "class", "found-preview svelte-1jw2xiu");
    			add_location(div2, file, 221, 2, 6634);
    			attr_dev(div3, "class", "hive-input svelte-1jw2xiu");
    			add_location(div3, file, 237, 2, 7048);
    			attr_dev(path, "d", "M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z");
    			add_location(path, file, 261, 4, 8046);
    			attr_dev(text_1, "x", "50%");
    			attr_dev(text_1, "y", "50%");
    			attr_dev(text_1, "dominant-baseline", "central");
    			attr_dev(text_1, "font-size", "80");
    			attr_dev(text_1, "class", "svelte-1jw2xiu");
    			add_location(text_1, file, 264, 4, 8193);
    			attr_dev(svg, "class", "hex hex-center svelte-1jw2xiu");
    			attr_dev(svg, "fill", "currentColor");
    			attr_dev(svg, "height", "100px");
    			attr_dev(svg, "width", "100px");
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "id", "Capa_1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "viewBox", "0 0 184.75 184.75");
    			attr_dev(svg, "xml:space", "preserve");
    			attr_dev(svg, "stroke", "#e6e6e6");
    			attr_dev(svg, "stroke-width", "0.0018475100000000001");
    			attr_dev(svg, "transform", "rotate(0)");
    			add_location(svg, file, 259, 3, 7696);
    			attr_dev(div4, "class", "hive-inner svelte-1jw2xiu");
    			add_location(div4, file, 257, 2, 7667);
    			attr_dev(button1, "class", "hive-button svelte-1jw2xiu");
    			add_location(button1, file, 288, 3, 9219);
    			attr_dev(i1, "class", "bi bi-arrow-repeat");
    			add_location(i1, file, 290, 4, 9375);
    			attr_dev(button2, "class", "hive-button shuffle-btn svelte-1jw2xiu");
    			add_location(button2, file, 289, 3, 9296);
    			attr_dev(button3, "class", "hive-button svelte-1jw2xiu");
    			add_location(button3, file, 292, 3, 9426);
    			attr_dev(div5, "class", "hive-buttons svelte-1jw2xiu");
    			add_location(div5, file, 287, 2, 9189);
    			attr_dev(div6, "class", "hive-outer svelte-1jw2xiu");
    			add_location(div6, file, 219, 1, 6606);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div0, anchor);
    			mount_component(progress, div0, null);
    			append_dev(div0, t3);
    			append_dev(div0, button0);
    			append_dev(button0, i0);
    			append_dev(button0, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div2);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				if (each_blocks_1[i]) {
    					each_blocks_1[i].m(div1, null);
    				}
    			}

    			append_dev(div2, t6);
    			if (if_block2) if_block2.m(div2, null);
    			append_dev(div6, t7);
    			append_dev(div6, div3);
    			if_block3.m(div3, null);
    			append_dev(div6, t8);
    			append_dev(div6, div4);
    			append_dev(div4, svg);
    			append_dev(svg, path);
    			append_dev(svg, text_1);
    			append_dev(text_1, t9);
    			append_dev(div4, t10);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div4, null);
    				}
    			}

    			append_dev(div6, t11);
    			append_dev(div6, div5);
    			append_dev(div5, button1);
    			append_dev(div5, t13);
    			append_dev(div5, button2);
    			append_dev(button2, i1);
    			append_dev(div5, t14);
    			append_dev(div5, button3);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "pointerdown", /*pointerdown_handler*/ ctx[19], false, false, false, false),
    					listen_dev(path, "pointerdown", /*pointerdown_handler_2*/ ctx[21], false, false, false, false),
    					listen_dev(text_1, "pointerdown", /*pointerdown_handler_3*/ ctx[22], false, false, false, false),
    					listen_dev(button1, "pointerdown", /*deleteLast*/ ctx[11], false, false, false, false),
    					listen_dev(button2, "pointerdown", /*shuffleLetters*/ ctx[12], false, false, false, false),
    					listen_dev(button3, "pointerdown", /*enterWord*/ ctx[13], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const modal_changes = {};

    			if (dirty[0] & /*foundWords, game*/ 9 | dirty[1] & /*$$scope*/ 4096) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_showModal && dirty[0] & /*showFoundWordsModal*/ 16) {
    				updating_showModal = true;
    				modal_changes.showModal = /*showFoundWordsModal*/ ctx[4];
    				add_flush_callback(() => updating_showModal = false);
    			}

    			modal.$set(modal_changes);

    			if (/*showGameOverModal*/ ctx[5]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*showGameOverModal*/ 32) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_6(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*showHintsModal*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*showHintsModal*/ 64) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t2.parentNode, t2);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const progress_changes = {};
    			if (dirty[0] & /*foundWords*/ 8) progress_changes.foundWords = /*foundWords*/ ctx[3];
    			if (dirty[0] & /*game*/ 1) progress_changes.game = /*game*/ ctx[0];
    			if (dirty[0] & /*score*/ 256) progress_changes.score = /*score*/ ctx[8];
    			progress.$set(progress_changes);

    			if (dirty[0] & /*foundWords*/ 8) {
    				each_value_2 = /*foundWords*/ ctx[3];
    				validate_each_argument(each_value_2);
    				validate_each_keys(ctx, each_value_2, get_each_context_2, get_key);
    				each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx, each_value_2, each0_lookup, div1, destroy_block, create_each_block_2, null, get_each_context_2);
    			}

    			if (/*foundWords*/ ctx[3].length > 0) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty[0] & /*foundWords*/ 8) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_3(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div2, null);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block3) {
    				if_block3.p(ctx, dirty);
    			} else {
    				if_block3.d(1);
    				if_block3 = current_block_type(ctx);

    				if (if_block3) {
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(div3, null);
    				}
    			}

    			if ((!current || dirty[0] & /*game*/ 1) && t9_value !== (t9_value = /*game*/ ctx[0].center.toUpperCase() + "")) set_data_dev(t9, t9_value);

    			if (dirty[0] & /*game, addLetter*/ 1025) {
    				each_value = /*game*/ ctx[0].outer;
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key_1);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key_1, 1, ctx, each_value, each1_lookup, div4, outro_and_destroy_block, create_each_block, null, get_each_context);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(progress.$$.fragment, local);

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			transition_in(if_block2);
    			transition_in(if_block3);

    			add_render_callback(() => {
    				if (!current) return;
    				if (!svg_transition) svg_transition = create_bidirectional_transition(svg, scale, { duration: 500 }, true);
    				svg_transition.run(1);
    			});

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(progress.$$.fragment, local);
    			transition_out(if_block2);
    			if (!svg_transition) svg_transition = create_bidirectional_transition(svg, scale, { duration: 500 }, false);
    			svg_transition.run(0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div0);
    			destroy_component(progress);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div6);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].d();
    			}

    			if (if_block2) if_block2.d();
    			if_block3.d();
    			if (detaching && svg_transition) svg_transition.end();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(143:1) {#if game}",
    		ctx
    	});

    	return block;
    }

    // (149:4) {#each foundWords.sort() as word (word)}
    function create_each_block_6(key_1, ctx) {
    	let span;
    	let a;
    	let t0_value = /*word*/ ctx[30] + "";
    	let t0;
    	let a_href_value;
    	let t1;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			span = element("span");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", a_href_value = "https://svenska.se/tre/?sok=" + /*word*/ ctx[30] + "&pz=1");
    			attr_dev(a, "class", "svelte-1jw2xiu");
    			add_location(a, file, 151, 6, 4503);
    			attr_dev(span, "class", "found-word-item svelte-1jw2xiu");
    			toggle_class(span, "pangram", /*game*/ ctx[0].pangrams.includes(/*word*/ ctx[30]));
    			add_location(span, file, 149, 5, 4414);
    			this.first = span;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, a);
    			append_dev(a, t0);
    			append_dev(span, t1);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*foundWords*/ 8 && t0_value !== (t0_value = /*word*/ ctx[30] + "")) set_data_dev(t0, t0_value);

    			if (dirty[0] & /*foundWords*/ 8 && a_href_value !== (a_href_value = "https://svenska.se/tre/?sok=" + /*word*/ ctx[30] + "&pz=1")) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty[0] & /*game, foundWords*/ 9) {
    				toggle_class(span, "pangram", /*game*/ ctx[0].pangrams.includes(/*word*/ ctx[30]));
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_6.name,
    		type: "each",
    		source: "(149:4) {#each foundWords.sort() as word (word)}",
    		ctx
    	});

    	return block;
    }

    // (145:1) <Modal bind:showModal={showFoundWordsModal}>
    function create_default_slot_2(ctx) {
    	let div1;
    	let h1;
    	let t0_value = /*foundWords*/ ctx[3].length + "";
    	let t0;
    	let t1;
    	let t2;
    	let div0;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_value_6 = /*foundWords*/ ctx[3].sort();
    	validate_each_argument(each_value_6);
    	const get_key = ctx => /*word*/ ctx[30];
    	validate_each_keys(ctx, each_value_6, get_each_context_6, get_key);

    	for (let i = 0; i < each_value_6.length; i += 1) {
    		let child_ctx = get_each_context_6(ctx, each_value_6, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_6(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = text(" words found");
    			t2 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "svelte-1jw2xiu");
    			add_location(h1, file, 146, 3, 4289);
    			attr_dev(div0, "class", "found-words-list svelte-1jw2xiu");
    			add_location(div0, file, 147, 3, 4333);
    			attr_dev(div1, "class", "found-words-container svelte-1jw2xiu");
    			add_location(div1, file, 145, 2, 4250);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h1);
    			append_dev(h1, t0);
    			append_dev(h1, t1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*foundWords*/ 8 && t0_value !== (t0_value = /*foundWords*/ ctx[3].length + "")) set_data_dev(t0, t0_value);

    			if (dirty[0] & /*game, foundWords*/ 9) {
    				each_value_6 = /*foundWords*/ ctx[3].sort();
    				validate_each_argument(each_value_6);
    				validate_each_keys(ctx, each_value_6, get_each_context_6, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_6, each_1_lookup, div0, destroy_block, create_each_block_6, null, get_each_context_6);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(145:1) <Modal bind:showModal={showFoundWordsModal}>",
    		ctx
    	});

    	return block;
    }

    // (159:1) {#if showGameOverModal}
    function create_if_block_6(ctx) {
    	let modal;
    	let updating_showModal;
    	let current;

    	function modal_showModal_binding_1(value) {
    		/*modal_showModal_binding_1*/ ctx[16](value);
    	}

    	let modal_props = {
    		$$slots: { default: [create_default_slot_1] },
    		$$scope: { ctx }
    	};

    	if (/*showGameOverModal*/ ctx[5] !== void 0) {
    		modal_props.showModal = /*showGameOverModal*/ ctx[5];
    	}

    	modal = new Modal({ props: modal_props, $$inline: true });
    	binding_callbacks.push(() => bind(modal, 'showModal', modal_showModal_binding_1));
    	modal.$on("closeModal", /*closeModal_handler*/ ctx[17]);

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modal_changes = {};

    			if (dirty[0] & /*game, foundWords*/ 9 | dirty[1] & /*$$scope*/ 4096) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_showModal && dirty[0] & /*showGameOverModal*/ 32) {
    				updating_showModal = true;
    				modal_changes.showModal = /*showGameOverModal*/ ctx[5];
    				add_flush_callback(() => updating_showModal = false);
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(159:1) {#if showGameOverModal}",
    		ctx
    	});

    	return block;
    }

    // (170:4) {#each game.validWords.sort() as word (word)}
    function create_each_block_5(key_1, ctx) {
    	let span;
    	let i;
    	let t0;
    	let a;
    	let t1_value = /*word*/ ctx[30] + "";
    	let t1;
    	let a_href_value;
    	let t2;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			span = element("span");
    			i = element("i");
    			t0 = space();
    			a = element("a");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(i, "class", "bi bi-check green svelte-1jw2xiu");
    			toggle_class(i, "invisible", !/*foundWords*/ ctx[3].includes(/*word*/ ctx[30]));
    			add_location(i, file, 171, 6, 5334);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", a_href_value = "https://svenska.se/tre/?sok=" + /*word*/ ctx[30] + "&pz=1");
    			attr_dev(a, "class", "svelte-1jw2xiu");
    			add_location(a, file, 173, 6, 5429);
    			attr_dev(span, "class", "found-word-item svelte-1jw2xiu");
    			toggle_class(span, "pangram", /*game*/ ctx[0].pangrams.includes(/*word*/ ctx[30]));
    			add_location(span, file, 170, 5, 5252);
    			this.first = span;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, i);
    			append_dev(span, t0);
    			append_dev(span, a);
    			append_dev(a, t1);
    			append_dev(span, t2);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*foundWords, game*/ 9) {
    				toggle_class(i, "invisible", !/*foundWords*/ ctx[3].includes(/*word*/ ctx[30]));
    			}

    			if (dirty[0] & /*game*/ 1 && t1_value !== (t1_value = /*word*/ ctx[30] + "")) set_data_dev(t1, t1_value);

    			if (dirty[0] & /*game*/ 1 && a_href_value !== (a_href_value = "https://svenska.se/tre/?sok=" + /*word*/ ctx[30] + "&pz=1")) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty[0] & /*game*/ 1) {
    				toggle_class(span, "pangram", /*game*/ ctx[0].pangrams.includes(/*word*/ ctx[30]));
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_5.name,
    		type: "each",
    		source: "(170:4) {#each game.validWords.sort() as word (word)}",
    		ctx
    	});

    	return block;
    }

    // (160:1) <Modal bind:showModal={showGameOverModal} on:closeModal={() => startNewGame(newGame)}>
    function create_default_slot_1(ctx) {
    	get_context(ctx);
    	let div2;
    	let div0;
    	let h1;
    	let t1;
    	let h20;
    	let span;
    	let t2_value = /*foundWords*/ ctx[3].length + "";
    	let t2;
    	let t3;
    	let t4_value = /*game*/ ctx[0].validWords.length + "";
    	let t4;
    	let t5;
    	let t6_value = Math.round((/*foundWords*/ ctx[3].length || 0) / /*game*/ ctx[0].validWords.length * 100) + "";
    	let t6;
    	let t7;
    	let t8;
    	let h21;
    	let t9;
    	let t10_value = getRank(/*score*/ ctx[8], /*game*/ ctx[0])[0] + "";
    	let t10;
    	let t11;
    	let div1;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_value_5 = /*game*/ ctx[0].validWords.sort();
    	validate_each_argument(each_value_5);
    	const get_key = ctx => /*word*/ ctx[30];
    	validate_each_keys(ctx, each_value_5, get_each_context_5, get_key);

    	for (let i = 0; i < each_value_5.length; i += 1) {
    		let child_ctx = get_each_context_5(ctx, each_value_5, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_5(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Time's up!";
    			t1 = space();
    			h20 = element("h2");
    			span = element("span");
    			t2 = text(t2_value);
    			t3 = text("/");
    			t4 = text(t4_value);
    			t5 = text(" words found\n\t\t\t\t\t(");
    			t6 = text(t6_value);
    			t7 = text("%)");
    			t8 = space();
    			h21 = element("h2");
    			t9 = text("Final rank: ");
    			t10 = text(t10_value);
    			t11 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "svelte-1jw2xiu");
    			add_location(h1, file, 163, 4, 4907);
    			attr_dev(span, "class", "green svelte-1jw2xiu");
    			add_location(span, file, 164, 8, 4935);
    			attr_dev(h20, "class", "svelte-1jw2xiu");
    			add_location(h20, file, 164, 4, 4931);
    			attr_dev(h21, "class", "svelte-1jw2xiu");
    			add_location(h21, file, 166, 4, 5106);
    			attr_dev(div0, "class", "endgame-msg svelte-1jw2xiu");
    			add_location(div0, file, 162, 3, 4877);
    			attr_dev(div1, "class", "found-words-list svelte-1jw2xiu");
    			add_location(div1, file, 168, 3, 5166);
    			attr_dev(div2, "class", "found-words-container svelte-1jw2xiu");
    			add_location(div2, file, 161, 2, 4838);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, h20);
    			append_dev(h20, span);
    			append_dev(span, t2);
    			append_dev(h20, t3);
    			append_dev(h20, t4);
    			append_dev(h20, t5);
    			append_dev(h20, t6);
    			append_dev(h20, t7);
    			append_dev(div0, t8);
    			append_dev(div0, h21);
    			append_dev(h21, t9);
    			append_dev(h21, t10);
    			append_dev(div2, t11);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div1, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			get_context(ctx);
    			if (dirty[0] & /*foundWords*/ 8 && t2_value !== (t2_value = /*foundWords*/ ctx[3].length + "")) set_data_dev(t2, t2_value);
    			if (dirty[0] & /*game*/ 1 && t4_value !== (t4_value = /*game*/ ctx[0].validWords.length + "")) set_data_dev(t4, t4_value);
    			if (dirty[0] & /*foundWords, game*/ 9 && t6_value !== (t6_value = Math.round((/*foundWords*/ ctx[3].length || 0) / /*game*/ ctx[0].validWords.length * 100) + "")) set_data_dev(t6, t6_value);
    			if (dirty[0] & /*foundWords, game*/ 9 && t10_value !== (t10_value = getRank(/*score*/ ctx[8], /*game*/ ctx[0])[0] + "")) set_data_dev(t10, t10_value);

    			if (dirty[0] & /*game, foundWords*/ 9) {
    				each_value_5 = /*game*/ ctx[0].validWords.sort();
    				validate_each_argument(each_value_5);
    				validate_each_keys(ctx, each_value_5, get_each_context_5, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_5, each_1_lookup, div1, destroy_block, create_each_block_5, null, get_each_context_5);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(160:1) <Modal bind:showModal={showGameOverModal} on:closeModal={() => startNewGame(newGame)}>",
    		ctx
    	});

    	return block;
    }

    // (182:1) {#if showHintsModal}
    function create_if_block_4(ctx) {
    	let modal;
    	let updating_showModal;
    	let current;

    	function modal_showModal_binding_2(value) {
    		/*modal_showModal_binding_2*/ ctx[18](value);
    	}

    	let modal_props = {
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};

    	if (/*showHintsModal*/ ctx[6] !== void 0) {
    		modal_props.showModal = /*showHintsModal*/ ctx[6];
    	}

    	modal = new Modal({ props: modal_props, $$inline: true });
    	binding_callbacks.push(() => bind(modal, 'showModal', modal_showModal_binding_2));

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modal_changes = {};

    			if (dirty[0] & /*game, foundWords, score*/ 265 | dirty[1] & /*$$scope*/ 4096) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_showModal && dirty[0] & /*showHintsModal*/ 64) {
    				updating_showModal = true;
    				modal_changes.showModal = /*showHintsModal*/ ctx[6];
    				add_flush_callback(() => updating_showModal = false);
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(182:1) {#if showHintsModal}",
    		ctx
    	});

    	return block;
    }

    // (192:7) {#if (i === 0 || (i === 1 && showFullHints))}
    function create_if_block_5(ctx) {
    	let t_value = /*c*/ ctx[36].toUpperCase() + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*game, foundWords*/ 9 && t_value !== (t_value = /*c*/ ctx[36].toUpperCase() + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(192:7) {#if (i === 0 || (i === 1 && showFullHints))}",
    		ctx
    	});

    	return block;
    }

    // (190:5) {#each word as c, i (i)}
    function create_each_block_4(key_1, ctx) {
    	let div;
    	let if_block = (/*i*/ ctx[38] === 0 || /*i*/ ctx[38] === 1 && /*showFullHints*/ ctx[33]) && create_if_block_5(ctx);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "word-hint-letter svelte-1jw2xiu");
    			add_location(div, file, 190, 6, 6000);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (/*i*/ ctx[38] === 0 || /*i*/ ctx[38] === 1 && /*showFullHints*/ ctx[33]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_5(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(190:5) {#each word as c, i (i)}",
    		ctx
    	});

    	return block;
    }

    // (188:3) {#each remainingWords as word (word)}
    function create_each_block_3(key_1, ctx) {
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t;
    	let each_value_4 = /*word*/ ctx[30];
    	validate_each_argument(each_value_4);
    	const get_key = ctx => /*i*/ ctx[38];
    	validate_each_keys(ctx, each_value_4, get_each_context_4, get_key);

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		let child_ctx = get_each_context_4(ctx, each_value_4, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_4(key, child_ctx));
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			attr_dev(div, "class", "word-hint svelte-1jw2xiu");
    			add_location(div, file, 188, 4, 5940);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div, null);
    				}
    			}

    			append_dev(div, t);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*game, foundWords, score*/ 265) {
    				each_value_4 = /*word*/ ctx[30];
    				validate_each_argument(each_value_4);
    				validate_each_keys(ctx, each_value_4, get_each_context_4, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_4, each_1_lookup, div, destroy_block, create_each_block_4, t, get_each_context_4);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(188:3) {#each remainingWords as word (word)}",
    		ctx
    	});

    	return block;
    }

    // (183:1) <Modal bind:showModal={showHintsModal}>
    function create_default_slot(ctx) {
    	get_context_1(ctx);
    	let h1;
    	let t0_value = /*remainingWords*/ ctx[32].length + "";
    	let t0;
    	let t1;
    	let t2;
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_value_3 = /*remainingWords*/ ctx[32];
    	validate_each_argument(each_value_3);
    	const get_key = ctx => /*word*/ ctx[30];
    	validate_each_keys(ctx, each_value_3, get_each_context_3, get_key);

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		let child_ctx = get_each_context_3(ctx, each_value_3, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_3(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = text(" remaining words:");
    			t2 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "svelte-1jw2xiu");
    			add_location(h1, file, 185, 2, 5812);
    			attr_dev(div, "class", "hints-container svelte-1jw2xiu");
    			add_location(div, file, 186, 2, 5865);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			append_dev(h1, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			get_context_1(ctx);
    			if (dirty[0] & /*game, foundWords*/ 9 && t0_value !== (t0_value = /*remainingWords*/ ctx[32].length + "")) set_data_dev(t0, t0_value);

    			if (dirty[0] & /*game, foundWords, score*/ 265) {
    				each_value_3 = /*remainingWords*/ ctx[32];
    				validate_each_argument(each_value_3);
    				validate_each_keys(ctx, each_value_3, get_each_context_3, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_3, each_1_lookup, div, destroy_block, create_each_block_3, null, get_each_context_3);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(183:1) <Modal bind:showModal={showHintsModal}>",
    		ctx
    	});

    	return block;
    }

    // (224:4) {#each foundWords as word, idx (word)}
    function create_each_block_2(key_1, ctx) {
    	let span;
    	let t0_value = /*word*/ ctx[30] + "";
    	let t0;
    	let t1;
    	let span_intro;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(span, "class", "found-word svelte-1jw2xiu");
    			add_location(span, file, 224, 5, 6747);
    			this.first = span;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*foundWords*/ 8 && t0_value !== (t0_value = /*word*/ ctx[30] + "")) set_data_dev(t0, t0_value);
    		},
    		i: function intro(local) {
    			if (!span_intro) {
    				add_render_callback(() => {
    					span_intro = create_in_transition(span, fly, { x: -100, duration: 500 });
    					span_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(224:4) {#each foundWords as word, idx (word)}",
    		ctx
    	});

    	return block;
    }

    // (230:3) {#if foundWords.length > 0}
    function create_if_block_3(ctx) {
    	let button;
    	let button_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Show all";
    			attr_dev(button, "class", "show-all-found-btn svelte-1jw2xiu");
    			add_location(button, file, 230, 3, 6889);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "pointerdown", /*pointerdown_handler_1*/ ctx[20], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!current) return;
    				if (!button_transition) button_transition = create_bidirectional_transition(button, fade, {}, true);
    				button_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!button_transition) button_transition = create_bidirectional_transition(button, fade, {}, false);
    			button_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (detaching && button_transition) button_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(230:3) {#if foundWords.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (249:3) {:else}
    function create_else_block_1(ctx) {
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_value_1 = /*currentWord*/ ctx[2];
    	validate_each_argument(each_value_1);
    	const get_key = ctx => /*idx*/ ctx[28];
    	validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		let child_ctx = get_each_context_1(ctx, each_value_1, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "hive-input-text svelte-1jw2xiu");
    			add_location(div, file, 249, 3, 7446);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentWord, game*/ 5) {
    				each_value_1 = /*currentWord*/ ctx[2];
    				validate_each_argument(each_value_1);
    				validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, div, destroy_block, create_each_block_1, null, get_each_context_1);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(249:3) {:else}",
    		ctx
    	});

    	return block;
    }

    // (239:3) {#if feedback.message}
    function create_if_block_1(ctx) {
    	let div;
    	let t0;
    	let t1_value = /*feedback*/ ctx[7].message + "";
    	let t1;
    	let div_class_value;
    	let div_intro;

    	function select_block_type_1(ctx, dirty) {
    		if (/*feedback*/ ctx[7].positive) return create_if_block_2;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(div, "class", div_class_value = "feedback feedback-" + (/*feedback*/ ctx[7].positive ? 'positive' : 'negative') + " svelte-1jw2xiu");
    			add_location(div, file, 239, 4, 7103);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    			append_dev(div, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type_1(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, t0);
    				}
    			}

    			if (dirty[0] & /*feedback*/ 128 && t1_value !== (t1_value = /*feedback*/ ctx[7].message + "")) set_data_dev(t1, t1_value);

    			if (dirty[0] & /*feedback*/ 128 && div_class_value !== (div_class_value = "feedback feedback-" + (/*feedback*/ ctx[7].positive ? 'positive' : 'negative') + " svelte-1jw2xiu")) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, { duration: 500 });
    					div_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(239:3) {#if feedback.message}",
    		ctx
    	});

    	return block;
    }

    // (251:4) {#each currentWord as letter, idx (idx)}
    function create_each_block_1(key_1, ctx) {
    	let span;
    	let t_value = /*letter*/ ctx[26].toUpperCase() + "";
    	let t;
    	let span_class_value;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			span = element("span");
    			t = text(t_value);

    			attr_dev(span, "class", span_class_value = "" + (null_to_empty(/*letter*/ ctx[26] == /*game*/ ctx[0].center
    			? "input-center-letter"
    			: "") + " svelte-1jw2xiu"));

    			add_location(span, file, 251, 5, 7526);
    			this.first = span;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*currentWord*/ 4 && t_value !== (t_value = /*letter*/ ctx[26].toUpperCase() + "")) set_data_dev(t, t_value);

    			if (dirty[0] & /*currentWord, game*/ 5 && span_class_value !== (span_class_value = "" + (null_to_empty(/*letter*/ ctx[26] == /*game*/ ctx[0].center
    			? "input-center-letter"
    			: "") + " svelte-1jw2xiu"))) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(251:4) {#each currentWord as letter, idx (idx)}",
    		ctx
    	});

    	return block;
    }

    // (244:5) {:else}
    function create_else_block(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "bi bi-x");
    			set_style(i, "font-size", "2rem");
    			set_style(i, "color", "red");
    			add_location(i, file, 244, 6, 7325);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(244:5) {:else}",
    		ctx
    	});

    	return block;
    }

    // (242:5) {#if feedback.positive}
    function create_if_block_2(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "bi bi-check green svelte-1jw2xiu");
    			set_style(i, "font-size", "2rem");
    			add_location(i, file, 242, 6, 7247);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(242:5) {#if feedback.positive}",
    		ctx
    	});

    	return block;
    }

    // (277:5) {#key game.outer}
    function create_key_block(ctx) {
    	let text_1;
    	let t_value = /*letter*/ ctx[26].toUpperCase() + "";
    	let t;
    	let text_1_transition;
    	let current;
    	let mounted;
    	let dispose;

    	function pointerdown_handler_5(...args) {
    		return /*pointerdown_handler_5*/ ctx[24](/*letter*/ ctx[26], ...args);
    	}

    	const block = {
    		c: function create() {
    			text_1 = svg_element("text");
    			t = text(t_value);
    			attr_dev(text_1, "x", "50%");
    			attr_dev(text_1, "y", "50%");
    			attr_dev(text_1, "dominant-baseline", "central");
    			attr_dev(text_1, "font-size", "80");
    			attr_dev(text_1, "class", "svelte-1jw2xiu");
    			add_location(text_1, file, 277, 5, 8963);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, text_1, anchor);
    			append_dev(text_1, t);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(text_1, "pointerdown", pointerdown_handler_5, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty[0] & /*game*/ 1) && t_value !== (t_value = /*letter*/ ctx[26].toUpperCase() + "")) set_data_dev(t, t_value);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!current) return;
    				if (!text_1_transition) text_1_transition = create_bidirectional_transition(text_1, fade, {}, true);
    				text_1_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!text_1_transition) text_1_transition = create_bidirectional_transition(text_1, fade, {}, false);
    			text_1_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(text_1);
    			if (detaching && text_1_transition) text_1_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_key_block.name,
    		type: "key",
    		source: "(277:5) {#key game.outer}",
    		ctx
    	});

    	return block;
    }

    // (270:3) {#each game.outer as letter, idx (letter)}
    function create_each_block(key_1, ctx) {
    	let first;
    	let svg;
    	let path;
    	let previous_key = /*game*/ ctx[0].outer;
    	let svg_class_value;
    	let svg_transition;
    	let current;
    	let mounted;
    	let dispose;

    	function pointerdown_handler_4(...args) {
    		return /*pointerdown_handler_4*/ ctx[23](/*letter*/ ctx[26], ...args);
    	}

    	let key_block0 = create_key_block(ctx);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			svg = svg_element("svg");
    			path = svg_element("path");
    			key_block0.c();
    			attr_dev(path, "d", "M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z");
    			add_location(path, file, 273, 5, 8795);
    			attr_dev(svg, "class", svg_class_value = "hex hex-outer hex" + (/*idx*/ ctx[28] + 1) + " svelte-1jw2xiu");
    			attr_dev(svg, "fill", "currentColor");
    			attr_dev(svg, "height", "100px");
    			attr_dev(svg, "width", "100px");
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "id", "Capa_1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "viewBox", "0 0 184.75 184.75");
    			attr_dev(svg, "xml:space", "preserve");
    			attr_dev(svg, "stroke", "#e6e6e6");
    			attr_dev(svg, "stroke-width", "0.0018475100000000001");
    			attr_dev(svg, "transform", "rotate(0)");
    			add_location(svg, file, 271, 4, 8433);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    			key_block0.m(svg, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(path, "pointerdown", pointerdown_handler_4, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*game*/ 1 && safe_not_equal(previous_key, previous_key = /*game*/ ctx[0].outer)) {
    				group_outros();
    				transition_out(key_block0, 1, 1, noop);
    				check_outros();
    				key_block0 = create_key_block(ctx);
    				key_block0.c();
    				transition_in(key_block0, 1);
    				key_block0.m(svg, null);
    			} else {
    				key_block0.p(ctx, dirty);
    			}

    			if (!current || dirty[0] & /*game*/ 1 && svg_class_value !== (svg_class_value = "hex hex-outer hex" + (/*idx*/ ctx[28] + 1) + " svelte-1jw2xiu")) {
    				attr_dev(svg, "class", svg_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key_block0);

    			add_render_callback(() => {
    				if (!current) return;
    				if (!svg_transition) svg_transition = create_bidirectional_transition(svg, scale, { duration: 500 }, true);
    				svg_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key_block0);
    			if (!svg_transition) svg_transition = create_bidirectional_transition(svg, scale, { duration: 500 }, false);
    			svg_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			if (detaching) detach_dev(svg);
    			key_block0.d(detaching);
    			if (detaching && svg_transition) svg_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(270:3) {#each game.outer as letter, idx (letter)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let script0;
    	let script0_src_value;
    	let script1;
    	let meta;
    	let t1;
    	let main;
    	let current;
    	let if_block = /*game*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			script0 = element("script");
    			script1 = element("script");
    			script1.textContent = "window.dataLayer = window.dataLayer || [];\n\t\tfunction gtag(){dataLayer.push(arguments);}\n\t\tgtag('js', new Date());\n\t\tgtag('config', 'G-1WQSF41QY5');\n\t";
    			meta = element("meta");
    			t1 = space();
    			main = element("main");
    			if (if_block) if_block.c();
    			script0.async = true;
    			if (!src_url_equal(script0.src, script0_src_value = "https://www.googletagmanager.com/gtag/js?id=G-1WQSF41QY5")) attr_dev(script0, "src", script0_src_value);
    			add_location(script0, file, 2, 1, 46);
    			add_location(script1, file, 3, 1, 134);
    			attr_dev(meta, "name", "theme-color");
    			attr_dev(meta, "content", "#008000");
    			add_location(meta, file, 10, 1, 307);
    			attr_dev(main, "class", "svelte-1jw2xiu");
    			add_location(main, file, 140, 0, 4181);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document_1.head, script0);
    			append_dev(document_1.head, script1);
    			append_dev(document_1.head, meta);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, main, anchor);
    			if (if_block) if_block.m(main, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*game*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*game*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(main, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(script0);
    			detach_dev(script1);
    			detach_dev(meta);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function arrayEqual(a, b) {
    	return a.length === b.length && a.every((v, i) => v === b[i]);
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let game;
    	let newGame;
    	let currentWord = "";
    	let foundWords = [];
    	let score = 0;
    	let showFoundWordsModal = false;
    	let showGameOverModal = false;
    	let showHintsModal = false;

    	async function loadGame() {
    		$$invalidate(0, game = JSON.parse(localStorage.getItem("game")));
    		$$invalidate(3, foundWords = JSON.parse(localStorage.getItem("foundWords")) || []);
    		$$invalidate(8, score = foundWords.reduce((acc, word) => acc + getWordScore(word, game), 0));
    		let res = await fetch("/get_game");
    		$$invalidate(1, newGame = await res.json());
    		console.log(newGame, game);

    		if (!game) {
    			console.log("No local game found, using new game");
    			startNewGame(newGame);
    		} else if (!arrayEqual(newGame.letters, game.letters)) {
    			console.log("Local game is outdated, showing game over modal");
    			$$invalidate(5, showGameOverModal = true);
    		}
    	}

    	loadGame();

    	function startNewGame(newGame) {
    		console.log("New game started");
    		$$invalidate(0, game = newGame);
    		$$invalidate(2, currentWord = "");
    		$$invalidate(3, foundWords = []);
    		$$invalidate(8, score = 0);
    		localStorage.setItem("game", JSON.stringify(game));
    		localStorage.setItem("foundWords", JSON.stringify(foundWords));
    	}

    	const feedback = {
    		message: undefined,
    		positive: undefined,
    		timeout: undefined,
    		pushMessage(message, positive) {
    			$$invalidate(2, currentWord = "");
    			if (feedback.timeout) clearTimeout(feedback.timeout);
    			$$invalidate(7, feedback.message = message, feedback);
    			$$invalidate(7, feedback.positive = positive, feedback);

    			$$invalidate(
    				7,
    				feedback.timeout = setTimeout(
    					() => {
    						$$invalidate(7, feedback.message = undefined, feedback);
    						$$invalidate(7, feedback.positive = undefined, feedback);
    					},
    					1000
    				),
    				feedback
    			);
    		}
    	};

    	onMount(() => {
    		console.log("App.svelte mounted");
    	});

    	function addLetter(letter) {
    		$$invalidate(7, feedback.message = undefined, feedback);
    		$$invalidate(7, feedback.timeout = undefined, feedback);
    		$$invalidate(2, currentWord += letter);
    	}

    	function deleteLast() {
    		$$invalidate(2, currentWord = currentWord.slice(0, -1));
    	}

    	function shuffleLetters() {
    		$$invalidate(0, game.letters = game.letters.sort(() => Math.random() - 0.5), game);
    	}

    	function enterWord() {
    		if (!currentWord) return;

    		if (currentWord.length < 4) {
    			feedback.pushMessage("Too short", false);
    			return;
    		}

    		if (!currentWord.includes(game.center)) {
    			feedback.pushMessage("Must include center letter", false);
    			return;
    		}

    		if (foundWords.includes(currentWord)) {
    			feedback.pushMessage("Already found", false);
    			return;
    		}

    		if (!game.validWords.includes(currentWord)) {
    			feedback.pushMessage("Not in wordlist", false);
    			return;
    		} else {
    			$$invalidate(3, foundWords = [currentWord, ...foundWords]);
    			let wordScore = getWordScore(currentWord, game);
    			$$invalidate(8, score += wordScore);
    			localStorage.setItem("foundWords", JSON.stringify(foundWords));

    			if (game.pangrams.includes(currentWord)) {
    				feedback.pushMessage(`Pangram!! (+${wordScore})`, true);
    			} else {
    				feedback.pushMessage(`Nice! (+${wordScore})`, true);
    			}

    			$$invalidate(2, currentWord = "");
    		}
    	}

    	document.addEventListener('keydown', e => {
    		if (e.key == "Backspace") {
    			deleteLast();
    		} else if (e.key == "Enter") {
    			enterWord();
    		} else {
    			addLetter(e.key);
    		}
    	});

    	function hintsAreUnlocked() {
    		let rank = getRank(score, game)[0];
    		return ["🦧Orangutang", "🧑🏿‍🌾Human", "🤖Robot"].includes(rank);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function modal_showModal_binding(value) {
    		showFoundWordsModal = value;
    		$$invalidate(4, showFoundWordsModal);
    	}

    	function modal_showModal_binding_1(value) {
    		showGameOverModal = value;
    		$$invalidate(5, showGameOverModal);
    	}

    	const closeModal_handler = () => startNewGame(newGame);

    	function modal_showModal_binding_2(value) {
    		showHintsModal = value;
    		$$invalidate(6, showHintsModal);
    	}

    	const pointerdown_handler = () => {
    		if (hintsAreUnlocked()) $$invalidate(6, showHintsModal = true); else feedback.pushMessage("Reach 🦧Orangutang to unlock hints", false);
    	};

    	const pointerdown_handler_1 = () => $$invalidate(4, showFoundWordsModal = true);
    	const pointerdown_handler_2 = e => addLetter(game.center);
    	const pointerdown_handler_3 = e => addLetter(game.center);
    	const pointerdown_handler_4 = (letter, e) => addLetter(letter);
    	const pointerdown_handler_5 = (letter, e) => addLetter(letter);

    	$$self.$capture_state = () => ({
    		onMount,
    		fade,
    		fly,
    		scale,
    		Modal,
    		Progress,
    		getWordScore,
    		getRank,
    		game,
    		newGame,
    		currentWord,
    		foundWords,
    		score,
    		showFoundWordsModal,
    		showGameOverModal,
    		showHintsModal,
    		arrayEqual,
    		loadGame,
    		startNewGame,
    		feedback,
    		addLetter,
    		deleteLast,
    		shuffleLetters,
    		enterWord,
    		hintsAreUnlocked
    	});

    	$$self.$inject_state = $$props => {
    		if ('game' in $$props) $$invalidate(0, game = $$props.game);
    		if ('newGame' in $$props) $$invalidate(1, newGame = $$props.newGame);
    		if ('currentWord' in $$props) $$invalidate(2, currentWord = $$props.currentWord);
    		if ('foundWords' in $$props) $$invalidate(3, foundWords = $$props.foundWords);
    		if ('score' in $$props) $$invalidate(8, score = $$props.score);
    		if ('showFoundWordsModal' in $$props) $$invalidate(4, showFoundWordsModal = $$props.showFoundWordsModal);
    		if ('showGameOverModal' in $$props) $$invalidate(5, showGameOverModal = $$props.showGameOverModal);
    		if ('showHintsModal' in $$props) $$invalidate(6, showHintsModal = $$props.showHintsModal);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*game*/ 1) {
    			if (game) $$invalidate(0, game.outer = game.letters.filter(letter => letter != game.center), game);
    		}

    		if ($$self.$$.dirty[0] & /*game*/ 1) {
    			if (game) $$invalidate(0, game.maxScore = game.validWords.reduce((acc, word) => acc + getWordScore(word, game), 0), game);
    		}
    	};

    	return [
    		game,
    		newGame,
    		currentWord,
    		foundWords,
    		showFoundWordsModal,
    		showGameOverModal,
    		showHintsModal,
    		feedback,
    		score,
    		startNewGame,
    		addLetter,
    		deleteLast,
    		shuffleLetters,
    		enterWord,
    		hintsAreUnlocked,
    		modal_showModal_binding,
    		modal_showModal_binding_1,
    		closeModal_handler,
    		modal_showModal_binding_2,
    		pointerdown_handler,
    		pointerdown_handler_1,
    		pointerdown_handler_2,
    		pointerdown_handler_3,
    		pointerdown_handler_4,
    		pointerdown_handler_5
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        props: {}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
